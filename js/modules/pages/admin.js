const isOdd = (number) => number % 2;

Vue.use(bootstrapVue);

const vm = new Vue({
    el: '#app',
    mixins: [mixin.mixin()],
    data:
        {
            user: new User(),
            form: {
                dataInizio: new Date(),
                dataFine: new Date(),
            },
            items: {
                cibo: [],
                panuozzo: [],
            },
            commensali: {
                items: [],
                type: 2
            },
            prenotazioneAggiuntiva: {
                food: 'mezzo panuozzo nutella',
                email: 'cosimo.chellini@gmail.com'
            },
            selezione: 'cibo',
            foods: window.foodGlobal,
            orarioPrenotazione: "20:00",
            riassuntoOrdineVisibile: false,
            fieldException: ['_id', 'prenotazioneId', 'email', 'date', '__v']
        },
    mounted() {
        if (!this.user.logged || !this.user.is(window.User.Type.Admin)) {
            window.location.href = "/";
        }
        this.fetchData();
    },
    methods: {
        getUserRoles() {
            if (!this.user.roles.length) return 'user';
            return this.user.roles.join(',');
        },

        bindCommensali(items = [], foods = []) {
            let commensali = [];
            items.forEach(item => {
                const _food = foods.find(cibo => cibo.name === item.food);
                commensali.push({...item, ..._food});
            });
            const pani = commensali.filter(c => c.food === 'mezzo panuozzo');

            if (isOdd(pani.length)) {
                const panoIndex = commensali.findIndex(c => c._id === pani[0]._id);
                commensali[panoIndex] = {...commensali[panoIndex], price: 5, only: true};
            }

            return commensali;
        },
        fetchData() {

            const [dataInizio, dataFine] = window.generateStartEnd(this.form.dataInizio, this.form.dataFine);

            Api('data').post('find', {
                query: {date: {$gte: dataInizio, $lt: dataFine}},
                table: "prenotazioneCibo"
            }).then((response) => this.items.cibo = response.data);

            Api('data').post('find', {
                query: {date: {"$gte": dataInizio, "$lt": dataFine}},
                table: "prenotazioni"
            }).then((response) => this.items.panuozzo = response.data);
        },
        showCommensali() {
            this.$refs.modalCommensali.show();
        },
        openPrenotazione() {
            window.open(this.linkPrenotazione, '_blank');
        },
        salvaPrenotazione() {
            const utente = this.commensaliList.find(utente => utente.email === this.prenotazioneAggiuntiva.email);

            Api('data').post('create', {
                data: {
                    food: this.prenotazioneAggiuntiva.food,
                    username: utente.username,
                    email: utente.email,
                    text: 'generato da pagina admin',
                    date: new Date()
                },
                table: "prenotazioneCibo"
            }).then(() => {
                this.fetchData();

                this.$refs.modalprenotazioneaggiuntiva.hide()
            });

        }
    },
    computed: {
        computedItems() {
            return this.items[this.selezione];
        },
        commensaliList() {
            let {type} = this.commensali;
            let items = this.bindCommensali(this.items.cibo, this.foods);

            if (type === 2) return items;

            return items.filter(item => item.type === type);
        },
        ordine() {
            let ordine = [];
            let commensali = this.commensaliList || [];

            commensali = commensali.filter(item => item.type === 0);

            const cibiDaOrdinare = [...new Set(commensali.map(cibo => cibo.name))];

            cibiDaOrdinare.forEach(cibo => {
                if (cibo !== 'mezzo panuozzo') {
                    ordine.push({
                        name: cibo, quantity: commensali.filter(i => i.food === cibo).length
                    });
                }
            });

            const mezzoPanuozzoQuantity = parseInt(commensali.filter(c => c.food === 'mezzo panuozzo').length);

            if (isOdd(mezzoPanuozzoQuantity)) {
                ordine.push({name: 'mezzo panuozzo', quantity: 1})
            }

            if (mezzoPanuozzoQuantity > 1) {
                ordine.push({name: 'panuozzo 8 pezzi', quantity: parseInt(mezzoPanuozzoQuantity / 2)});
            }

            ordine = ordine.sort((a, b) => {
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
                return 0;
            });

            return ordine;
        },
        linkPrenotazione() {
            const today = new Date();

            const date = `${window.dateFns.format(today, "MM/DD/YYYY")} ${this.orarioPrenotazione}`;

            const dateCrypted = btoa(new Date(date).getTime());

            return `${origin}\\prenotazione?${dateCrypted}`;
        },
        prezzoPanuozzo() {
            const connteggioCommensali = [...new Set(this.commensaliList.map(cibo => cibo.username))].length;

            const conteggioPaniNutella = this.commensaliList.filter(item => item.food === 'mezzo panuozzo nutella').length;

            return (conteggioPaniNutella * 4) / connteggioCommensali;
        }

    },
    watch: {
        form: {
            handler: function () {
                this.fetchData();
            },
            deep: true
        }
    }
});

window.netlifyIdentity.on("logout", () => window.location.href = "/");

setInterval(() => {
    vm.$mount();
}, 10000);