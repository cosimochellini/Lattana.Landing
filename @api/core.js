const mongoose = require('mongoose');

import user from "../customJs/userClass";

const prenotazioni = require('../schema/prenotazioni');

const prenotazioneCibo = require('../schema/prenotazioneCibo');

const options = { reconnectTries: 100, reconnectInterval: 500, poolSize: 10, bufferMaxEntries: 0, useNewUrlParser: true };

/**
 * genera tutte le variabili di base per la chiamata
 * @param {Object} event 
 * @param {Object} context 
 */
const importData = (event, context) => {
    let exportData = {};

    mongoose.connect(process.env.db, options).then(success => console.log('db connesso')).catch(err => console.log(err));

    exportData.authorized = !!context && !!context.clientContext

    if (exportData.authorized) {
        exportData.identity = context.clientContext.identity;
        exportData.currentUser = new user(context.clientContext.user);
    } else {
        exportData.identity = {};
        exportData.currentUser = {};
    }

    exportData.body = event.body ? event.body : {};

    exportData.parameters = event.queryStringParameters
        ? event.queryStringParameters
        : {};

    exportData.db = {};

    exportData.db.prenotazioni = mongoose.model('prenotazioni', prenotazioni, 'prenotazioni');

    exportData.db.prenotazioneCibo = mongoose.model('prenotazioneCibo', prenotazioneCibo, 'prenotazioneCibo');

    // exportData.options = { reconnectTries: 100, reconnectInterval: 500, poolSize: 10, bufferMaxEntries: 0, useNewUrlParser: true };

    return exportData;
}

export default importData;