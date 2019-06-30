/**
 * the default function to get data
 * @param {string} controller
 */
const Api = (controller) => {
    let origin = window.location.origin;
    let _baseUrl = '';

    if (origin.includes('localhost') || origin.includes('file:')) {
        _baseUrl = `https://cors-anywhere.herokuapp.com/https://lattana.org/.netlify/functions/${controller}?action=`;
    } else {
        _baseUrl = `${origin}/.netlify/functions/${controller}?action=`;
    }

    return axios.create({
        baseURL: _baseUrl,
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": `Bearer ${new window.User().token}`
        },
        method: 'post'
    });
};
