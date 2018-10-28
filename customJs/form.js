let formController = {};
//`$`
formController.checkFunctions = {};

/**
 * return if the string is a correct text field
 * @param {string} prefix prefix of the ID
 * @param {string} name name of the ID
 * @param {object} options other options for complex usecase
 * @returns {boolean} result
 */
formController.checkFunctions.text = (prefix, name, options = { min: 4, max: 40 }) => {
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

}

formController.checkFunctions.email = (prefix, name) => {
    if (!prefix || !name) return false;

    let startId = `#${prefix}${name}`;

    let $field = $(startId);

    if (!_isMail($field.val())) {
        $(`${startId}Error`).show();
        $field.focus();
        return false;
    } else {
        $(`${startId}Error`).hide();
    }

    return true;
}

formController.checkFunctions.phone = (prefix, name) => {
    if (!prefix || !name) return false;

    let startId = `#${prefix}${name}`;

    let $field = $(startId);

    if (!_isPhone($field.val())) {
        $(`${startId}Error`).show();
        $field.focus();
        return false;
    } else {
        $(`${startId}Error`).hide();
    }

    return true;
}

formController.checkForm = ({ prefix, fields = [] }) => {
   let result = true;

    fields.forEach(({ name, check, options }) => result = result && formController.checkFunctions[check](prefix, name, options));

    return result;
}

/**
 * return if the string is a correct mail
 * @param {string} email email to check
 * @returns {boolean} result
 */
const _isMail = email => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

/**
 * return if the string is a correct phone
 * @param {string} phone phone to check
 * @returns {boolean} result
 */
const _isPhone = phone => {
    var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return re.test(String(phone).toLowerCase());
}