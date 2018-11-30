
class Form {
    static get checkFunctions() {
        return {
            /**
             * return if the string is a correct text field
             * @param {string} prefix prefix of the ID
             * @param {string} name name of the ID
             * @param {object} options other options for complex usecase
             * @returns {boolean} result
             */
            text: (prefix, name, options = { min: 4, max: 40 }) => {
                if (!prefix || !name) return false;

                let startId = `#${prefix}${name}`;
                let $field = $(startId);

                if ($field.val().length < options.min) {
                    $field.focus();
                    $(`${startId}Error`).show();
                    return false;
                } else {
                    $(`${startId}Error`).hide();
                }

                if ($field.val().length > options.max) {
                    $field.focus();
                    $(`${startId}Long`).show();
                    return false;
                } else {
                    $(`${startId}Long`).hide();
                }
                return true;
            },
            email: (prefix, name) => {
                if (!prefix || !name) return false;

                let startId = `#${prefix}${name}`;

                let $field = $(startId);

                if (!Form._isMail($field.val())) {
                    $(`${startId}Error`).show();
                    $field.focus();
                    return false;
                } else {
                    $(`${startId}Error`).hide();
                }

                return true;
            },
            phone: (prefix, name) => {
                if (!prefix || !name) return false;

                let startId = `#${prefix}${name}`;

                let $field = $(startId);

                if (!Form._isPhone($field.val())) {
                    $(`${startId}Error`).show();
                    $field.focus();
                    return false;
                } else {
                    $(`${startId}Error`).hide();
                }

                return true;
            }
        }
    }
    constructor({ prefix = '', fields = [] }) {
        this.prefix = prefix;
        this.fields = fields;
    }

    /**
     * return if the string is a correct mail
     * @param {string} email email to check
     * @returns {boolean} result
     */
    static _isMail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    /**
    * return if the string is a correct phone
    * @param {string} phone phone to check
    * @returns {boolean} result
    */
    static _isPhone(phone) {
        var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        return re.test(String(phone).toLowerCase());
    }

    checkForm() {
        let result = true;

        this.fields.forEach(({ name, check, options }) => result = result && Form.checkFunctions[check](this.prefix, name, options));

        return result;
    }
    generateObject() {
        let formObj = {};

        this.fields.forEach(field => formObj[field.name] = $(`#${this.prefix}${field.name}`).val());

        return formObj;
    }
}
