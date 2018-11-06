const MongoClient = require('mongodb').MongoClient;

exports.handler = function (event, context, callback) {
    console.log(arguments);

    if (MongoClient) {
        console.log("yeah");
    }
    callback(null, {
        statusCode: 200,
        body: process.env.mongoPwd
    });
}