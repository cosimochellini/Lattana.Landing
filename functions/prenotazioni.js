require('dotenv').config();

const mongoose = require('mongoose');

import immportData from "../@api/core.js"

import reservePanuozzoToday from "../@api/controller/prenotazioni"

exports.handler = async (event, context) => {

    //    const { identity, currentUser, body, parameters, authorized, db, action } = immportData(event, context);
    const data = immportData(event, context);


    
    console.log('action', data.action);

    switch (data.action) {
        case '/reservePanuozzoToday':
            return reservePanuozzoToday(data);
        default:
            console.log('Oranges are $0.59 a pound.');
            break;
    }

    // const prenotazioniQuery = await db.prenotazioni.find({}).exec();

    // return {
    //     statusCode: 200,
    //     body: JSON.stringify(prenotazioniQuery)
    // };

};