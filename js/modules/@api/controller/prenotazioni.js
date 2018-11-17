import { Model } from "mongoose";

import {generateStartEnd} from "../../utils/date";

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
 * @returns {boolean} l'esito
 */
const reservePanuozzoToday = async ({ identity, currentUser, body, authorized, db }) => {

    let prenotazione = new db.prenotazioni({
        username: currentUser.username,
        email: currentUser.email,
        date: new Date()
    });

    try {
        await prenotazione.save();
        let prenotazioneCibo = new db.prenotazioneCibo({
            food: body.cibo,
            username: currentUser.username,
            email: currentUser.email,
            date: new Date(),
            text: body.note,
            prenotazioneId: prenotazione.id
        });
        try {
            await prenotazioneCibo.save();
        } catch (ex) {
            console.log('err prenotazioneCibo.save', ex);
        }
    } catch (e) {
        console.log('err prenotazione.save', e);

    }

    // console.log(prenotazione);

};

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
 * @returns {Promise<Array<Object>>} l'esito
 */
const getPrenotazioniCibo = async ({ identity, currentUser, body, authorized, db }) => {

    const [dataInizio, dataFine] = generateStartEnd(body.dataInizio, body.dataFine);

    console.log('dataInizio, dataFine',dataInizio, dataFine);

    const items = await db.prenotazioneCibo.find( //query today up to tonight
        {
            "date": {
                "$gte": dataInizio,
                "$lt": dataFine
            }
        });

    console.log('items', items);

    return items;
};

export {
    reservePanuozzoToday,
    getPrenotazioniCibo
};