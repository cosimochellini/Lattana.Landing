Vue.use(bootstrapVue);

new Vue({
    el: '#app',
    mixins: [mixin.mixin()],
    data: {
        user: new User(),
        prenotazioniPanuozzo: [],
        prenotazioniCibo: [],
        prenotazioneToday: {
            persistent: false
        },
        foods: window.foodGlobal
    },
    mounted() {
        if (!this.user.logged) {
            window.location.href = "/";
        }
        const [dataInizio, dataFine] = window.generateStartEnd();

        Api('data').post('find', {
            query: {
                date: {$gte: dataInizio, $lt: dataFine},
                username: this.user.username
            },
            table: "prenotazioneCibo"
        }).then(({data}) => {
            if (!data.length) return;

            const [prenotazione] = data;
            const order = this.foods.find(f => f.name === prenotazione.food);
            this.prenotazioneToday = {...prenotazione, ...order, persistent: true};
        });

        this.getAllPrenotazioni();
    },
    methods: {
        getUserRoles() {
            if (!this.user.roles.length) return 'user';
            return this.user.roles.join(',');
        },
        getAllPrenotazioni() {
            Api('data').post('find', {
                table: "prenotazioneCibo",
                query: {username: this.user.username}
            }).then(response => this.prenotazioniCibo = response.data);

            Api('data').post('find', {
                table: "prenotazioni",
                query: {username: this.user.username}
            }).then(response => this.prenotazioniPanuozzo = response.data);
        },
        lastMonth(items = []) {
            let lastMonthItems = [];
            const differenceDay = 30;
            const now = new Date();
            let difference = window.dateFns.differenceInDays;
            items.forEach(item => {
                if (difference(now, item.date) < differenceDay) lastMonthItems.push(item);
            });
            return lastMonthItems;
        },
        editPrenotazione(show = true) {
            this.$refs.modalEditPrenotazione[show ? 'show' : 'hide']();
        },
        deletePrenotazione(show = true, goDelete = false) {
            this.$refs.modalDeletePrenotazione[show ? 'show' : 'hide']();
            if (!goDelete) return;

            Api('data').post('findOneAndDelete', {
                table: "prenotazioneCibo",
                filter: {'_id': this.prenotazioneToday._id}
            }).then(() => {
                this.prenotazioneToday.persistent = false;
                this.$mount()
            });
        },
        dateFormatter(date) {
            return mixin.toDate(date, 'DD/MM/YYYY HH:mm');
        },
        updatePrenotazione() {
            const {food, text} = this.prenotazioneToday;
            Api('data').post('findOneAndUpdate', {
                table: "prenotazioneCibo",
                update: {
                    'food': food,
                    'text': text
                },
                filter: {
                    '_id': this.prenotazioneToday._id
                }
            }).then(() => {
                this.editPrenotazione(false);
                this.$mount();
            });
        }
    },
    computed: {
        prenotazioniCiboMonth() {
            return this.lastMonth(this.prenotazioniCibo).length;
        },
        prenotazioniPanuozzoMonth() {
            return this.lastMonth(this.prenotazioniPanuozzo).length;
        }
    },
    watch: {
        'prenotazioneToday.food': {
            handler: function (food) {
                const order = this.foods.find(f => f.name === food);
                this.prenotazioneToday.price = order.price;
            }
        }
    }

});

window.netlifyIdentity.on("logout", () => window.location.href = "/");
