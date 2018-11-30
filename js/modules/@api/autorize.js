/**
 * controlla se l'utente è autorizzato a fare questa chiamata
 * @param {Object} event
 * @param {Object<User>} currentUser
 * @param {String} role
 * @returns {boolean}
 */
const checkAutorize = (event, currentUser, role = '') => {

    const origin = event.headers.origin.toString();

    if (origin.includes('localhost:') || origin.includes('file:')) return true;

    if (!role) return true;

    return !(!currentUser && !currentUser.is(role));

};

export {
    checkAutorize
}