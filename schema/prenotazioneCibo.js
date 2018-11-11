import { Schema } from 'mongoose';

export default mongoose.model('prenotazioneCibo', new Schema({
    food: String,
    username: String,
    email: String,
    text: String,
    date: { type: Date, default: Date.now },
    prenotazione: [
        { type: Schema.Types.ObjectId, ref: 'prenotazioni' }
    ]
}));