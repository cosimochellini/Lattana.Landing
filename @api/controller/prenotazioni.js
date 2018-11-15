
const reservePanuozzoToday = ({ identity, currentUser, body, authorized, db, action }) => {


    if (!currentUser.logged) {
        console.log('unathorized', currentUser);
        return "unauthorized";
    }

    // const prenotazioniCtx = db.prenotazioni;
    // const prenotazioniCiboCtx = db.prenotazioniCibo;

    let prenotazione = new db.prenotazioni({
        food: body.cibo,
        username: body.username,
        email: body.email,
        date: new Date(),
        prenotazioneId: '5be1b549e7179a6bbb967c21'
    });

    prenotazione.save(function (err) {
        console.log('err prenotazione.save', err);
    });

}

export default reservePanuozzoToday