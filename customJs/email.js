var emailController = {};


emailController.recipient = "cosimo.chellini@gmail.com";
/**
 * send an email to Don G for telling him that there is a 
 * reserved piece of panuozzo
 * @returns {boolean} the esit
 */
emailController.reservePanuozzo = () => {
    let form = {
        prefix: 'panuozzo',
        fields: [
            { name: 'Name', check: 'text' },
            { name: 'Email', check: 'email' },
            { name: 'Phone', check: 'phone' },
            { name: 'Message', check: 'text', options: { min: 0, max: 400 } }
        ]
    }

    if (!formController.checkForm(form)) return;

    let formObj = formController.generateObject(form);

    let subject = "Don G, there is a new reserve for the Panuozzo!";

    let body = `
    Hi Don G, 
    ${formObj.Name} want make a reserve for your panuozzo's piece,
    more info: 
    email : ${formObj.Email},
    phone : ${formObj.Phone},
    message : ${formObj.Message || 'nothing  ¯\_(ツ)_/¯'}
`;
    emailController.sendMail(emailController.recipient, subject, body);

};

/**
 * send a full mail
 * @param recipient {string} recipient
 * @param subject {string} subject
 * @param body {string} the body
 */
emailController.sendMail = (recipient, subject, body) => {
    window.location.href = `mailto: ${recipient}?subject = ${subject}& body=${encodeURI(body)} `;
}