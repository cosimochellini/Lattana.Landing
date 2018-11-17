let currentUser = new User();

// if (!currentUser.logged && window.location.origin.includes("file://")) {
//     window.location.href = "./";
// }

netlifyIdentity.on("logout", () => window.location.href = "./");

let vm = new Vue({
    el: '#app',
    data() {
        return {
            user: currentUser
        }
    },
    mounted() {
        if (!this.user.logged) {
            // window.location.href = "./";
        }
    },
    methods: {
        closeModal() {
            $('#reservationModal').modal('hide');
        }
    }
});