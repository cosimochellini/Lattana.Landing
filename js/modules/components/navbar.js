Vue.component('navbar', {
    template:
        `
    <b-navbar type="dark" variant="dark" toggleable>
    <b-navbar-toggle target="nav_dropdown_collapse"></b-navbar-toggle>
    <b-navbar-brand tag="h1" class="mb-0">Lattana User: {{user.username}}</b-navbar-brand>

    <b-collapse is-nav id="nav_dropdown_collapse">
      <b-navbar-nav>
        <b-nav-item href="#">Lattana</b-nav-item>
        <b-nav-item href="/">Home</b-nav-item>
        <b-nav-item href="/admin/admin" v-if="isAdmin">Admin</b-nav-item>
        <!-- Navbar dropdowns -->
       
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>

    `,
    props : ['user'],
    methods: {
        isAdmin(){
            return this.user.is(window.User.Type.Admin);
        }
    }
});