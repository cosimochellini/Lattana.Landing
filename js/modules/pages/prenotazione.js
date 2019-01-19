let vm = new Vue({
    el: '#app',
    data: {
        activeItem: 0
    },
    mounted() {
        this.$vs.notify({
            title: 'Connessione Effettuata',
            color: 'primary',
            icon: 'check_box'
        });
    }
});