import {Model} from "mongoose";

import {generateStartEnd} from "../../utils/date";

/**
 * prenota un panuozzo per oggi, creando anche la prenotazione
 * @param {Object} param0 l'oggetto data generato da importData(...)
 * @param {Object<user>} param0.currentUser
 * @param {Object} param0.body
 * @param {Object} param0.db
 * @param {Model<any, {}>} param0.db.prenotazioneCibo context della tabella prenotazioneCibo
 * @param {Model<any, {}>} param0.db.prenotazioni context della tabella prenotazioni
 * @returns {boolean|Object} l'esito
 */
const reservePanuozzoToday = async ({currentUser, body, db}) => {

    const [dataInizio, dataFine] = generateStartEnd();

    let prenotazione = await db.prenotazioni.findOne({
        date: {$gte: dataInizio, $lt: dataFine},
        username: currentUser.username,
        email: currentUser.email
    });

    let prenotazioneCibo = await db.prenotazioneCibo.findOne({
        date: {$gte: dataInizio, $lt: dataFine},
        username: currentUser.username,
        email: currentUser.email
    });

    try {
        if (!prenotazione) {

            prenotazione = new db.prenotazioni({
                username: currentUser.username,
                email: currentUser.email,
                date: new Date()
            });
            await prenotazione.save();
        }
        if (!prenotazioneCibo) {

            prenotazioneCibo = new db.prenotazioneCibo({
                food: body.cibo,
                username: body.username,
                email: body.email,
                date: new Date(),
                text: body.note,
                prenotazioneId: prenotazione.id
            });
            try {
                await prenotazioneCibo.save();
                return prenotazioneCibo;
            } catch (ex) {
                console.log('err prenotazioneCibo.save', ex);
                return false;
            }
        }

    } catch (e) {
        console.log('err prenotazione.save', e);
        return false;
    }
};

export {
    reservePanuozzoToday
};