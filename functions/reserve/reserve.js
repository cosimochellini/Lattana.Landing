var MongoClient = require('mongodb').MongoClient;
var userClass = require('./sharedModules/userClass');

exports.handler = function (event, context, callback) {
    // console.log(arguments);

    const { identity, user } = context.clientContext;

    console.log(new userClass(user));

    console.log('user info');

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