Vue.use(bootstrapVue);

let vm = new Vue({
    el: '#app',
    data: {
        user: new User(),
        prenotazioniPanuozzo: [],
        prenotazioniCibo: []
    },
    mounted() {
        if (!this.user.logged) {
            // window.location.href = "./";
        }
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
        }
    }

});

window.netlifyIdentity.on("logout", () => window.location.href = "./");
