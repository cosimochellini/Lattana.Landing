const urlsParams = location.href.split('?');

if (urlsParams.length < 2) location.href = "/";

let timestamp;

try {
    timestamp = parseInt(atob(urlsParams[1]));
} catch (e) {
    location.href = "/";
}

if (isNaN(timestamp)) location.href = "/";

let vm = new Vue({
    el: '#app',
    data: {
        prenotazioni: [],
        foods: window.foodGlobal,
        activeItem: 0,
        oraPrenotazione: new Date(timestamp)
    },
    mounted() {
        this.fetchData({onMounted: true});
    },
    methods: {
        fetchData(params = {}) {

            Api('data').post('find', {
                table: "prenotazioneCibo"
            }).then((response) => {
                if (params.onMounted) {
                    this.$vs.notify({
                        title: 'Connessione Effettuata',
                        color: 'primary',
                        icon: 'check_box'
                    });
                }
                this.prenotazioni = response.data
            }).catch(error => {
                this.$vs.notify({
                    title: 'Error',
                    color: 'danger',
                    text: error.message,
                    icon: 'check_box'
                });
            });
        },
        bindCommensali() {
            let items = this.prenotazioni || [];

            let commensali = [];

            items.forEach(item => {
                const _food = this.foods.find(cibo => cibo.name === item.food);
                commensali.push({...item, ..._food});
            });
            const pani = commensali.filter(c => c.food === 'mezzo panuozzo');

            if (this.isOdd(pani.length)) {
                const panoIndex = commensali.findIndex(c => c._id === pani[0]._id);
                commensali[panoIndex] = {...commensali[panoIndex], price: 5, only: true};
            }

            return commensali;
        },
        isOdd(number) {
            return number % 2;
        }
    },
    computed: {
        ordine() {
            let ordine = [];

            let commensali = this.bindCommensali();

            commensali = commensali.filter(item => item.type === 0);

            const cibiDaOrdinare = [...new Set(commensali.map(cibo => cibo.name))];

            cibiDaOrdinare.forEach(cibo => {
                if (cibo !== 'mezzo panuozzo') {
                    ordine.push({
                        name: cibo,
                        quantity: commensali.filter(i => i.food === cibo).length,
                        color: this.foods.find(x => x.name === cibo).color
                    });
                }
            });
            const mezzoPanuozzoQuantity = parseInt(commensali.filter(c => c.food === 'mezzo panuozzo').length);

            if (this.isOdd(mezzoPanuozzoQuantity)) {
                ordine.push({name: 'mezzo panuozzo', quantity: 1, color: '#006978'})
            }

            if (mezzoPanuozzoQuantity > 1) {
                ordine.push({
                    name: 'panuozzo 8 pezzi',
                    quantity: parseInt(mezzoPanuozzoQuantity / 2),
                    color: '#8e0000'
                });
            }

            ordine = ordine.sort((a, b) => {
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
                return 0;
            });

            return ordine;
        },
        totale() {
            let commensali = this.bindCommensali();

            return commensali.map(c => c.price).reduce((a, b) => a + b, 0);
        }
    },
    filters: {
        ora(date) {
            if (!date) return '';
            return window.dateFns.format(date, 'HH:mm');
        }
    }
});


setInterval(() => {
    vm.fetchData({onTimerUpdate: true});
}, 10000);