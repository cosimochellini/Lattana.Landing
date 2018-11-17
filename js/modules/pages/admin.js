let currentUser = new User();

if (!currentUser.logged && window.location.origin != "file://") {
    window.location.href = "./";
}

netlifyIdentity.on("logout", () => window.location.href = "./");

let vm = new Vue({
    el: '#app',
    data() {
        return {
            user: currentUser
        }
    },
    mounted() {
        if (!this.user.logged && this.user.is(User.Type.Admin)) {
            window.location.href = "./";
        }
    },
    methods: {
        closeModal() {
            $('#reservationModal').modal('hide');
        }
    }
});