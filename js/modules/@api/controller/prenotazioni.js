import { Model } from "mongoose";

/**
 * prenota un panuozzo per oggi, creando anche la prenotazione
 * @param {Object} param0 l'oggetto data generato da importData(...)
 * @param {Object} param0.identity 
 * @param {Object<user>} param0.currentUser
 * @param {Object} param0.body
 * @param {boolean} param0.authorized
 * @param {Object} param0.db 
 * @param {Model<any, {}>} param0.db.prenotazioneCibo context della tabella prenotazioneCibo
 * @param {Model<any, {}>} param0.db.prenotazioni context della tabella prenotazioni
 * @param {Function} param0.callback
 * @returns {Promise<boolean>} l'esito
 */
const reservePanuozzoToday = async ({ identity, currentUser, body, authorized, db , callback }) => {

    let prenotazione = new db.prenotazioneCibo({
        food: body.cibo,
        username: body.username,
        email: body.email,
        date: new Date(),
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