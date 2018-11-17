const mongoose = require('mongoose');

import user from "../utils/userClass";

const prenotazioni = require('../schema/prenotazioni');

const prenotazioneCibo = require('../schema/prenotazioneCibo');

const options = { reconnectTries: 100, reconnectInterval: 500, poolSize: 10, bufferMaxEntries: 0, useNewUrlParser: true };

/**
 * genera tutte le variabili di base per la chiamata
 * @param {Object} event 
 * @param {Object} context 
 * @param {function} callback
 * @returns {Object}
 */
const importData = (event, context, callback) => {
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

    try {
        exportData.body = JSON.parse(event.body);
    } catch (ex) {
        exportData.body = {};
    }

    exportData.callback = callback;

    exportData.parameters = event.queryStringParameters
        ? event.queryStringParameters
        : {};

    exportData.action = exportData.parameters ? exportData.parameters.action : '';

    exportData.db = {};

    exportData.db.prenotazioni = mongoose.model('prenotazioni', prenotazioni, 'prenotazioni');

    exportData.db.prenotazioneCibo = mongoose.model('prenotazioneCibo', prenotazioneCibo, 'prenotazioneCibo');

    //exportData.callback = callback;

    // exportData.options = { reconnectTries: 100, reconnectInterval: 500, poolSize: 10, bufferMaxEntries: 0, useNewUrlParser: true };

    return exportData;
};

/**
 * return the correct response obj
 * @param {number} statuscode 
 * @param {Object} obj 
 * @returns {Object}
 */
const _response = function(statuscode, obj) {
    return {
        'statusCode': statuscode,
        'body': JSON.stringify(obj)
    };
};

export {
    importData,
    _response
} ;