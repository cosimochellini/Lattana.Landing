require('dotenv').config();

// const mongoose = require('mongoose');

import {_response, importData} from "../../@api/core"

import {find, findOneAndUpdate, findOneAndDelete} from "../../@api/controller/mongooseQuery";

import {reservePanuozzoToday} from "../../@api/controller/prenotazioni";

exports.handler = async function (event, context) {

    let data = importData(event, context);

    let responseData;
    switch (data.action) {

        case '/find':
            responseData = await find(data);
            break;
        case '/findOneAndUpdate':
            responseData = await findOneAndUpdate(data);
            break;
            case '/findOneAndDelete':
            responseData = await findOneAndDelete(data);
            break;
        case '/delete':
            console.log('da implementare');
            break;
        case '/reservePanuozzoToday':
            responseData = await reservePanuozzoToday(data);
            break;
        default:
            console.log('invalid action => ', data.action);
            break;
    }

    return _response(200, responseData);

    // const prenotazioniQuery = await db.prenotazioni.find({}).exec();

};