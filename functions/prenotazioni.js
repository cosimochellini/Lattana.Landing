require('dotenv').config();

const mongoose = require('mongoose');

import user from "../customJs/userClass";

const prenotazioni = require('../schema/prenotazioni');

const prenotazioneCibo = require('../schema/prenotazioneCibo');

const prenotazioniContext = mongoose.model('prenotazioni', prenotazioni, 'prenotazioni');

const prenotazioneCiboContext = mongoose.model('prenotazioneCibo', prenotazioneCibo, 'prenotazioneCibo');

const options = {
    reconnectTries: 100, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    bufferMaxEntries: 0,
    useNewUrlParser: true
};

exports.handler = async (event, context) => {

    let identity, currentUser;

    if (!context && !context.clientContext) {
        return {
            statusCode: 401,
            body: JSON.stringify(posts)
        };
    }
    try {
        identity = context.clientContext.identity;
        currentUser = new user(context.clientContext.user);
    } catch (ex) {
        console.log(ex);
    }

    
    mongoose.connect(process.env.db, options).then(success => console.log('db connesso')).catch(err => console.log(err));

    const prenotazioniQuery = await prenotazioniContext.find({}).exec();

    return {
        statusCode: 200,
        body: JSON.stringify(prenotazioniQuery)
    };

};