/**
 * controlla se l'utente è autorizzato a fare questa chiamata
 * @param {Object} event
 * @param {User} currentUser
 * @param {String} role
 * @returns {boolean}
 */
const checkAutorize = (event, currentUser, role = '') => {

    const origin = event.headers.host;

    if (origin.includes('localhost:') || origin.includes('file:')) return true;

    if(!role) return true;

    if (!currentUser || !currentUser.is(role)) return false;
};

export {
    checkAutorize
}