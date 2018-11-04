class user {
    constructor() {
        let currentUser = this._getUser();
        if (!currentUser) {
            this.logged = false;
            console.log("Nessun Utente");
            return;
        }
        this.token = currentUser.token.access_token;
        this.roles = currentUser.app_metadata.roles;
        this.email = currentUser.email;
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
            "Other" : "Other"
        }
    }
    /**
     * return if the user is a specific role
     * @param {string} role 
     */
    is(role) {
        return this.roles.map(role => role.toLocaleLowerCase()).includes(role.toLocaleLowerCase());
    }

};
