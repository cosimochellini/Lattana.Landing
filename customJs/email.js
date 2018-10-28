var emailController = {};


emailController.reservePanuozzo = () => {
    let form = {
        prefix: 'panuozzo',
        fields: [
            { name: 'Name', check: 'text' },
            { name: 'Surname', check: 'text' },
            { name: 'Email', check: 'email' },
            { name: 'Phone', check: 'phone' },
            { name: 'Message', check: 'text', options: { min: 0, max: 400 } }
        ]
    }

    if (formController.checkForm(form)) {
        alert("")
    }
};


