require('dotenv').config();

// const mongoose = require('mongoose');

import { _response, importData } from "../../@api/core"

import { reservePanuozzoToday, getPrenotazioniCibo } from "../../@api/controller/prenotazioni"

exports.handler = async function (event, context) {

    let data = importData(event, context, () => console.log('nessun callback'));

    console.log('action', data.action);
    let responeData;
    switch (data.action) {
        case '/reservePanuozzoToday':
             await reservePanuozzoToday(data);
            break;
        case '/getPrenotazioniCibo':
            responeData = await getPrenotazioniCibo(data);
            break;
        default:
            console.log('invalid action => ', data.action);
            break;
    }

    return _response(200, responeData ? responeData : "tutto ok");

    // const prenotazioniQuery = await db.prenotazioni.find({}).exec();

};