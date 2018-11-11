import userClass from "../customJs/userClass";
require('dotenv').config();

import {mongoose } from "mongoose";

exports.handler = function (event, context, callback) {
    // console.log(arguments);

    //const { identity, user } = context.clientContext;

    //const currentUser = new userClass(user);

    //console.log("logged", currentUser.logged);

     //console.log("event", event);

     //console.log('context', context);

     //console.log('identity ', identity);

    //const body = event.body;

    //console.log('body', body);

    //const queryP = event.queryStringParameters;

    //console.log('queryP', queryP);


    //console.log(identity, user);

    if (mongoose) {
        console.log("yeah");
    }
    callback(null, {
        statusCode: 200,
        body: JSON.stringify(process.env.db)
    });
};

// handler();