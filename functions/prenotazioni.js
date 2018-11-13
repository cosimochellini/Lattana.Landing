require('dotenv').config();

const mongoose = require('mongoose');

import userClass from "../customJs/userClass";

const prenotazioni = require('../schema/prenotazioni');

const prenotazioneCibo = require('../schema/prenotazioneCibo');


const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type"
};


exports.handler =  (event, context, callback) => {

    // if (!context && !context.clientContext) {
    //     callback(null, {
    //         statusCode: 401,
    //         body: JSON.stringify(posts)
    //     });
    // }

    // const { identity, user } = context.  clientContext;
    const options = {
        reconnectTries: 100, // Never stop trying to reconnect
        reconnectInterval: 500, // Reconnect every 500ms
        poolSize: 10, // Maintain up to 10 socket connections
        bufferMaxEntries: 0,
        useNewUrlParser: true
    };

    mongoose.connect(process.env.db, options).then(success => console.log('db connesso', success)).catch(err => console.log(err));

    // console.log('db connesso');

    const prenotazioniContext = mongoose.model('prenotazioni', prenotazioni, 'prenotazioni');

    console.log('mongoose,model');

    const prenotazioneCiboContext = mongoose.model('prenotazioneCibo', prenotazioneCibo, 'prenotazioneCibo');

    console.log('mongoose,model');

    const prenotazioni = prenotazioniContext.find({}).exec();

    console.log(prenotazioni);

    callback(null, {
        statusCode: 200,
        body: JSON.stringify(prenotazioni)
    });
    // prenotazioneCiboContext.findOne(function (err, users) {

    //     callback(null, {
    //         statusCode: 200,
    //         body: JSON.stringify(users)
    //     });
    // });
    // console.log(query);
    // console.log(arguments);

    // const currentUser = new userClass(user);

    //console.log("logged", currentUser.logged);

    //console.log("event", event);

    //console.log('context', context);

    //console.log('identity ', identity);

    // const body = event.body;

    //console.log('body', body);

    //const queryP = event.queryStringParameters;

    //console.log('queryP', queryP);


    //console.log(identity, user);

    // if (mongoose) {
    //     console.log("yeah");
    // }
    // callback(null, {
    //     statusCode: 200,
    //     body: JSON.stringify(query)
    // });
};

// handler();