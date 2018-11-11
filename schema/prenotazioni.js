const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const prenotazioni = new Schema({
    username: String,
    date: { type: Date, default: Date.now },
    body: String,
    email: String
});

module.exports = prenotazioni;