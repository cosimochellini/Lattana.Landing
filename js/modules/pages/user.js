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

window.netlifyIdentity.on("logout", () => window.location.href = "./");
