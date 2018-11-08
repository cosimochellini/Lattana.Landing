var MongoClient = require('mongodb').MongoClient;
var userClass = require('./sharedModules/userClass');

exports.handler = function (event, context, callback) {
    // console.log(arguments);

    const { identity, user } = context.clientContext;

    console.log("event", event)

    console.log('context', context)

    console.log('identity ', identity)

    const body = event.body;

    console.log('body', body);

    const queryP = event.queryStringParameters;

    console.log('queryP', queryP);


    // console.log(identity, user);

    if (MongoClient) {
        console.log("yeah");
    }
    callback(null, {
        statusCode: 200,
        body: process.env.mongoPwd
    });
}

// handler();