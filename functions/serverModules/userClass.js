class User {
    constructor(currentUser = this._getUser()) {

        if (!currentUser) {
            this.logged = false;
            console.log("Nessun Utente");
            return;
        }
        this.token = currentUser.token.access_token;
        this.roles = currentUser.app_metadata.roles;
        this.email = currentUser.email;
        this.username = currentUser.user_metadata.full_name;
        this.logged = true;

    }

    _getUser() {
        try {
            return JSON.parse(localStorage["gotrue.user"]);
        } catch (ex) {
            return null;
        }
    }

    static get Type() {
        return {
            "Admin": "Admin",
            "User": "User",
            "Collaborator": "Collaborator",
            "Other": "Other"
        }
    }

    static get Login() {
        netlifyIdentity.open();
    }

    static get Logout() {
        netlifyIdentity.logout();
    }


    /**
     * return if the user is a specific role
     * @param {string} role 
     */
    is(role) {
        return this.roles.map(role => role.toLocaleLowerCase()).includes(role.toLocaleLowerCase());
    }

};

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.exports = User;
else
    window.User = User;