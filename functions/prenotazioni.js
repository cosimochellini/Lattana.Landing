require('dotenv').config();

const mongoose = require('mongoose');

import userClass from "../customJs/userClass";

const prenotazioni = require('../schema/prenotazioni');

const prenotazioneCibo = require('../schema/prenotazioneCibo');

exports.handler = function (event, context, callback) {

    if (!context && !context.clientContext) {
        callback(null, {
            statusCode: 401,
            body: JSON.stringify(posts)
        });
    }

    const { identity, user } = context.clientContext;

    mongoose.connect(process.env.db, {}).catch(err => console.log(err));

    const prenotazioniContext = mongoose.model('prenotazioni', prenotazioni, 'prenotazioni');

    const prenotazioneCiboContext = mongoose.model('prenotazioneCibo', prenotazioneCibo, 'prenotazioneCibo');

    prenotazioniContext.find({})
        .exec(function (error, posts) {
            callback(null, {
                statusCode: 200,
                body: JSON.stringify(posts)
            });
        })

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