Vue.component('navbar', {
    template:
        `
    <b-navbar type="dark" variant="dark" toggleable>
    <b-navbar-toggle target="nav_dropdown_collapse"></b-navbar-toggle>
    <b-navbar-brand tag="h1" class="mb-0">Lattana User: {{user.username}}</b-navbar-brand>

    <b-collapse is-nav id="nav_dropdown_collapse">
      <b-navbar-nav>
        <b-nav-item href="#">Lattana</b-nav-item>
        <b-nav-item href="./">Home</b-nav-item>
        <!-- Navbar dropdowns -->
        <b-nav-item-dropdown text="Lang" right>
          <b-dropdown-item href="#">EN</b-dropdown-item>
          <b-dropdown-item href="#">ES</b-dropdown-item>
          <b-dropdown-item href="#">RU</b-dropdown-item>
          <b-dropdown-item href="#">FA</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item-dropdown text="User" right>
          <b-dropdown-item href="#">Account</b-dropdown-item>
          <b-dropdown-item href="#">Settings</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>

    `,
    props : ['user']
})