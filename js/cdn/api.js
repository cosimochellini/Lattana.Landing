/**
 * the default function to get data
 * @param {string} controller
 */
const Api = (controller) => {
    let origin = window.location.origin;
    let _baseUrl = '';

    if (origin.includes('localhost') || origin.includes('file:')) {
        _baseUrl = `http://localhost:9000/${controller}?action=`;
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
