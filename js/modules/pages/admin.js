let currentUser = new User();

Vue.use(bootstrapVue);

new Vue({
    el: '#app',
    data:
    {
        user: currentUser,
        form: {
            prenotazioniCibo: {
                dataInizio: new Date(),
                dataFine: new Date()
            }
        },
        items: {
            prenotazioniCibo: []
        }
    },
    mounted() {
        if (!this.user.logged) {
            // window.location.href = "./";
        }
        Api('data').post('getPrenotazioniCibo', {
            dataInizio : this.form.prenotazioniCibo.dataInizio,
            dataFine : this.form.prenotazioniCibo.dataFine
        }).then(( response ) => this.items.prenotazioniCibo = response.data);
    },
    methods: {
        getUserRoles() {
            if (!this.user.roles.length) {
                return 'user';
            }

            return this.user.roles.join(',');
        }
    }
});

window.netlifyIdentity.on("logout", () => window.location.href = "./");
