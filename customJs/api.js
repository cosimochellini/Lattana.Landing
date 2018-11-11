const Api = axios.create({
    baseURL: `${window.location.origin}/.netlify/functions/`,
    baseURL: `localhost:9000/`,
    headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Authorization": `Bearer ${new User().token}`
    },
    method: 'post',
});
