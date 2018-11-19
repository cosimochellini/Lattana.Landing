/**
 * controlla se l'utente è autorizzato a fare questa chiamata
 * @param {Object} event
 * @param {User} currentUser
 * @param {String} role
 * @returns {boolean}
 */
const checkAutorize = (event, currentUser, role = '') => {

    console.log('header', event.headers);

    const origin = event.headers.host.toString();

    if (origin.includes('localhost:') || origin.includes('file:')) return true;

    if (!role) return true;

    return !(!currentUser || !currentUser.is(role));

};

export {
    checkAutorize
}