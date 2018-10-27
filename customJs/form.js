let formController = {};
//`$`
formController.checkFunctions = {};

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

}

formController.checkForm = ({ prefix, fields }) => {
    if (!fields) return false;

    fields.forEach(({ name, check, options }) => {
        if (!name || !check) return false;

        if (!formController.checkFunctions[check](prefix, name, options)) return false;
    });


    return true;
}