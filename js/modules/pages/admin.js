Vue.use(bootstrapVue);

new Vue({
    el: '#app',
    data:
        {
            user: new User(),
            form: {
                dataInizio: new Date(),
                dataFine: new Date()
            },
            items: {
                prenotazioniCibo: []
            }
        },
    mounted() {
        if (!this.user.logged) {
            // window.location.href = "./";
        }

        this.fetchData();
    },
    methods: {
        getUserRoles() {
            if (!this.user.roles.length) return 'user';
            return this.user.roles.join(',');
        },
        fetchData() {

            const [dataInizio, dataFine] = window.generateStartEnd(this.form.dataInizio, this.form.dataFine);

            Api('data').post('find', {
                query: {date: {$gte: dataInizio, $lt: dataFine},},
                table: "prenotazioneCibo"
            }).then((response) => this.items.prenotazioniCibo = response.data);

            Api('data').post('find', {
                query: {date: {"$gte": dataInizio, "$lt": dataFine},},
                table: "prenotazioni"
            }).then((response) => this.items.prenotazioni = response.data);
        }
    },
    components: {
        vuejsDatepicker
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

window.netlifyIdentity.on("logout", () => window.location.href = "./");
