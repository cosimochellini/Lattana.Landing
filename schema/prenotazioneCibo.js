const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const prenotazioneCibo = new Schema({
    food: String,
    username: String,
    email: String,
    text: String,
    date: { type: Date, default: Date.now },
    prenotazioneId: String
});

module.exports = prenotazioneCibo;