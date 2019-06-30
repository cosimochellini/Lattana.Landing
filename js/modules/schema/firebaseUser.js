const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const firebaseUser = new Schema({
    date: { type: Date, default: Date.now },
    token: String
});

module.exports = firebaseUser;