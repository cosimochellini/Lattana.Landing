class User {
    constructor(currentUser = this._getUser()) {

        this.version = '0.0.3';
        this.roles = [];
        this.logged = false;

        if (!currentUser) return;

        if (currentUser && currentUser.token && currentUser.token.access_token) {
            this.token = currentUser.token.access_token;
        }

        this.roles = currentUser.app_metadata.roles || [];
        this.email = currentUser.email;
        this.username = currentUser.user_metadata.full_name;
        this.logged = true;

    }

    _getUser() {
        try {
            if (window.location.origin === "http://localhost:63342") {
                return {
                    app_metadata: {
                        roles: ["Admin"]
                    },
                    user_metadata: {
                        full_name: "Cosimo"
                    },
                    email: "cosimo.chellini@gmail.com"
                }
            }
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

}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.exports = User;
else
    window.User = User;