var MongoClient = require('mongodb').MongoClient;
var userClass = require('./sharedModules/userClass');

exports.handler = function (event, context, callback) {
    // console.log(arguments);

    const { identity, user } = context.clientContext;

    console.log("event", event)

    console.log('context', context)

    console.log('identity ', identity)

    const body = JSON.parse('body', event.body);
    
    const queryP = JSON.parse('queryP', event.queryStringParameters);

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