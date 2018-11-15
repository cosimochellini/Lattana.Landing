
const reservePanuozzoToday = ({ identity, currentUser, body, authorized, db }) => {


    // if (!currentUser.logged) {
    //     console.log('unathorized', currentUser);
    //     return "unauthorized";
    // }

    // const prenotazioniCtx = db.prenotazioni;
    // const prenotazioniCiboCtx = db.prenotazioniCibo;
    console.log('body', JSON.parse(body));

    let prenotazione = new db.prenotazioneCibo({
        food: body.cibo,
        username: body.username,
        email: body.email,
        date: new Date(),
        prenotazioneId: '5be1b549e7179a6bbb967c21'
    });

    console.log(prenotazione);

    prenotazione.save(function (err) {
        console.log('err prenotazione.save', err);
    });

    return 'ok';

}

export default reservePanuozzoToday