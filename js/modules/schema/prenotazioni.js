import { Schema } from 'mongoose';

const prenotazioni = new Schema({
    username: String,
    date: { type: Date, default: Date.now },
    body: String,
    email: String
});

export default prenotazioni;