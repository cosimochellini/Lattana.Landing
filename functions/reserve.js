
exports.handler = function (event, context, callback) {
    console.log(arguments);
    const MongoClient = require('mongodb').MongoClient;

    if(MongoClient){
        console.log("yeah");
    }
    callback(null, {
        statusCode: 200,
        body: process.env.mongoPwd
    });
}