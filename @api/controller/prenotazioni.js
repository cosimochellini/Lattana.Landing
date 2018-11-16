
const reservePanuozzoToday = async ({ identity, currentUser, body, authorized, db, callback }) => {

    let prenotazione = new db.prenotazioneCibo({
        food: body.cibo,
        username: body.username,
        email: body.email,
        date: new Date(),
        prenotazioneId: '5be1b549e7179a6bbb967c21',
        note : body.note
    });

    // console.log(prenotazione);
    try {
        await prenotazione.save();
    } catch (ex) {
        console.log('err prenotazione.save', ex);
    }

};


export default reservePanuozzoToday;