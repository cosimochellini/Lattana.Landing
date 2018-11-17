/**
 * the default function to get data
 * @param {string} controller 
 */
const Api = (controller) => 
     axios.create({
        //baseURL: `${window.location.origin}/.netlify/functions/${controller}?action=`,
        baseURL: `http://localhost:9000/${controller}?action=`,
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": `Bearer ${new window.User().token}`
        },
        method: 'post',
    });