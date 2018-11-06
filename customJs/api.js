function postData(url = ``, data = {}) {
    // Default options are marked with *
    return fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
        .then(response => response.json()); // parses response to JSON
}

class Api {
    constructor(url = '', data = {}, method = 'post') {
        this.url = this.generateUrl(url);
        this.settings = {
            method: method,
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": `Bearer ${new User().token}`
            },
            body: JSON.stringify(data), // body data type must match "Content-Type" header

        }
    }

    async run() {
        const response = await fetch(this.url, this.settings);
        return response;
    }
    runAsync(callback) {
        fetch(this.url, this.settings).then(response => callback(response));
    }

    generateUrl(controller = '') {
        return `${window.location.origin}/.netlify/functions/${controller}`;
    }
}