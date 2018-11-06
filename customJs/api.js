const Api = axios.create({
    baseURL: `${window.location.origin}/.netlify/functions/`,
    headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Authorization": `Bearer ${new User().token}`
    },
    method: 'post',
});
