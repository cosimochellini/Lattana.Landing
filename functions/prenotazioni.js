require('dotenv').config();

const mongoose = require('mongoose');

import userClass from "../customJs/userClass";

const prenotazioni = require('../schema/prenotazioni');

exports.handler = function (event, context, callback) {
    const { db, mongoPwd, url } = process.env;

    console.log(url + mongoPwd + db);
    const options = {
        // autoIndex: false, // Don't build indexes
        reconnectTries: 100, // Never stop trying to reconnect
        reconnectInterval: 500, // Reconnect every 500ms
        poolSize: 10, // Maintain up to 10 socket connections
        // If not connected, return errors immediately rather than waiting for reconnect
        bufferMaxEntries: 0
    };

    var www = "mongodb://cosimochellini:1234Lattana@ds151533.mlab.com:51533/lattana";

    mongoose.connect(www, options).then(
        () => {
            console.log("connected to mongoDB")
        },
        (err) => {
            console.log("err", err);
        });

    const prenotazioniContext = mongoose.model('prenotazioni', prenotazioni, 'prenotazioni');

    prenotazioniContext.findOne(function (err, users) {

        callback(null, {
            statusCode: 200,
            body: JSON.stringify(users)
        });
    });
    // console.log(query);
    // console.log(arguments);

    // const { identity, user } = context.clientContext;

    //const currentUser = new userClass(user);

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