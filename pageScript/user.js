let currentUser = new User();

if (!currentUser.logged && window.location.origin != "file://") {
    window.location.href = "./";
}

let vm = new Vue({
    el: '#app',
    data() {
        return {
            user: currentUser
        }
    },
    mounted() {
        console.log();
    }
});