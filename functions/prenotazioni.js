require('dotenv').config();

const mongoose = require('mongoose');

import immportData from "../@api/core.js"

exports.handler = async (event, context) => {


    const { identity, currentUser, body, parameters, authorized, db, action } = immportData(event, context);

    console.log('currentUser', currentUser);

    console.log('body', body);

    console.log('parameters', parameters);


    switch (action) {
        case '/action':
            console.log(identity, currentUser, body, parameters, authorized, db);
            break;
        default:
            console.log('Oranges are $0.59 a pound.');
            break;
    }


    const prenotazioniQuery = await db.prenotazioni.find({}).exec();

    return {
        statusCode: 200,
        body: JSON.stringify(prenotazioniQuery)
    };

};