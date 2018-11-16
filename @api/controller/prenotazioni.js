import { Model } from "mongoose";

/**
 * prenota un panuozzo per oggi, creando anche la prenotazione
 * @param {Object} param0 
 * @param {Object} param0.db 
 * @param {Model<any, {}>} param0.db.prenotazioneCibo 
 * @param {Model<any, {}>} param0.db.prenotazioni
 * @param {Object<user>} param0.currentUser
 * @param {Function} param0.callback
 * @param {boolean} param0.authorized
 */
const reservePanuozzoToday = async ({ identity, currentUser, body, authorized, db, callback }) => {

    let prenotazione = new db.prenotazioneCibo({
        food: body.cibo,
        username: body.username,
        email: body.email,
        date: new Date(),
        prenotazioneId: '5be1b549e7179a6bbb967c21',
        text: body.note
    });

    // console.log(prenotazione);
    try {
        await prenotazione.save();
    } catch (ex) {
        console.log('err prenotazione.save', ex);
    }

};


export default reservePanuozzoToday;