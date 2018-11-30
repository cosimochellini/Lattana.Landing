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
        }
    },
    mounted() {
        if (!this.user.logged) {
            // window.location.href = "./";
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
            const order = food.find(f => f.name === prenotazione.food);
            this.prenotazioneToday = {...prenotazione, ...order, persistent: true};

        });

        this.getAllPrenotazioni();
    },
    methods: {
        getUserRoles() {
            if (!this.user.roles.length) {
                return 'user';
            }

            return this.user.roles.join(',');
        },
        getAllPrenotazioni() {
            Api('data').post('find', {
                table: "prenotazioneCibo",
                username: this.user.username
            }).then(response => this.prenotazioniCibo = response.data);

            Api('data').post('find', {
                table: "prenotazioni",
                username: this.user.username
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
        }
    },
    computed: {
        prenotazioniCiboMonth() {
            return this.lastMonth(this.prenotazioniCibo).length;
        },
        prenotazioniPanuozzoMonth() {
            return this.lastMonth(this.prenotazioniPanuozzo).length;
        }
    }

});

window.netlifyIdentity.on("logout", () => window.location.href = "/");

const food = [
    {name: 'panuozzo', type: 0, price: 4},
    {name: 'pizza', type: 0, price: 6},
    {name: 'kebab', type: 1, price: 6},
    {name: 'other', type: 1, price: 0}];
