require('dotenv').config();

const mongoose = require('mongoose');

import immportData from "../@api/core.js"

exports.handler = async (event, context) => {


    const { identity, currentUser, body, parameters, authorized, db } = immportData(event, context);

    // console.log('identity', identity);

    console.log('currentUser', currentUser);

    console.log('body', body);

    console.log('parameters', parameters);

    // console.log('authorized', authorized);

    // console.log('db', db);

    const prenotazioniQuery = await db.prenotazioni.find({}).exec();

    return {
        statusCode: 200,
        body: JSON.stringify(prenotazioniQuery)
    };

};