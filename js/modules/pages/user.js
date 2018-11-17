let currentUser = new User();

Vue.use(bootstrapVue);

let vm = new Vue({
    el: '#app',
    data() {
        return {
            user: currentUser,
            foo : 'bar'
        }
    },
    mounted() {
        if (!this.user.logged) {
            // window.location.href = "./";
        }
    },
    methods: {
        getUserRoles(){
            if (!this.user.lenght){
                return 'user';
             }

             return this.user.roles.join(',');
        }
    }
});

netlifyIdentity.on("logout", () => window.location.href = "./");
