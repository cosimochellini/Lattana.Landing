require('dotenv').config();

// const mongoose = require('mongoose');

import {_response, importData} from "../../@api/core"

import {queryFind} from "../../@api/controller/mongooseQuery";

import {reservePanuozzoToday} from "../../@api/controller/prenotazioni";

exports.handler = async function (event, context) {

    let data = importData(event, context, () => console.log('nessun callback'));

    let responeData;
    switch (data.action) {

        case '/find':
            responeData = await queryFind(data);
            break;
        case '/reservePanuozzoToday':
            responeData = await reservePanuozzoToday(data);
            break;
        default:
            console.log('invalid action => ', data.action);
            break;
    }

    return _response(200, responeData ? responeData : "tutto ok");

    // const prenotazioniQuery = await db.prenotazioni.find({}).exec();

};