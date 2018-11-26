Vue.component('navbar', {
    template:
        `
    <b-navbar type="dark" variant="dark" toggleable fixed='top'>
    <b-navbar-toggle target="nav_dropdown_collapse"></b-navbar-toggle>
    <b-navbar-brand tag="h1" href="/" class="mb-0">Lattana User: {{user.username}}</b-navbar-brand>

    <b-collapse is-nav id="nav_dropdown_collapse">
      <b-navbar-nav>
        <b-nav-item href="/user">Profilo</b-nav-item>
        <b-nav-item href="/">Home</b-nav-item>
        <b-nav-item href="/admin/admin" v-if="isAdmin">Admin</b-nav-item>
        <b-nav-item href="#" @click="logout">Logout</b-nav-item>
        <!-- Navbar dropdowns -->
        </b-navbar-nav>
    </b-collapse>
  </b-navbar>

    `,
    props: ['user'],
    methods: {
        logout() {
            netlifyIdentity.logout();
        }
    },
    computed: {
        isAdmin() {
            return this.user.is(window.User.Type.Admin);
        }
    }
});