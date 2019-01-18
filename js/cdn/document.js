/**
 * function that return the current session
 * @returns {string} current session
 */
let getSession = async () => {
    return (new Date().toLocaleString("en-us", {month: "long"}));
};
/**
 * controlla lo stato dell'utente
 */
let checkUserStatus = () => {
    let currentUser = new User();
    let $adminNavItem = $("#adminNavItem");
    let $UserNavItem = $("#UserNavItem");

    if (currentUser.logged) {
        $adminNavItem.show();
        $adminNavItem.text(currentUser.username);

        $UserNavItem.hide();
    } else {
        $UserNavItem.show();
        $adminNavItem.hide();
    }
};

let getCurrentPrenotazione = async () => {
    const [dataInizio, dataFine] = window.generateStartEnd();

    return await Api('data').post('find', {
        query: {
            date: {$gte: dataInizio, $lt: dataFine},
            email: new window.User().email
        },
        table: "prenotazioneCibo"
    });
};

let openReservePanuozzo = async () => {
    let currentUser = new User();
    let $alertReservePanuozzo = $("#alertReservePanuozzo");
    let $formServePanuozzo = $("#formServePanuozzo");

    if (!currentUser.logged) {
        $formServePanuozzo.hide();
        $alertReservePanuozzo.show();
        return;
    }

    let $messageFormPanuozzo = $('#messageFormPanuozzo');
    let $btnReservePanuozzo = $('#btnReservePanuozzo');

    $formServePanuozzo.show();
    $alertReservePanuozzo.hide();

    const {data} = await getCurrentPrenotazione();
    const [prenotazione] = data;

    $btnReservePanuozzo.prop('disabled', !!prenotazione);
    $btnReservePanuozzo.val(!prenotazione ? 'Reserve Now' : 'Reservation already done');

    if (prenotazione) {
        $messageFormPanuozzo.show();

        const oraPrenotazione = window.dateFns.format(prenotazione.date, 'HH:mm:ss');

        $messageFormPanuozzo.html(` 
        <b class="text-center">  The reservation for today has already been made at ${oraPrenotazione}</b>
        `);
    } else {
        $messageFormPanuozzo.hide();
    }

    $("#panuozzoEmail").attr('value', currentUser.email);
    $("#panuozzoName").attr('value', currentUser.username);

};

let reservePanuozzo = () => {
    const prenotazionePezzi = 1;

    const prenotazioneCibo = $('#panuozzoCibo').val();

    const prenotazioneNote = $('#panuozzoMessage').val();

    const currentUser = new User();
    try {
        Api('data').post('reservePanuozzoToday', {
            pezzi: prenotazionePezzi,
            cibo: prenotazioneCibo,
            username: currentUser.username,
            email: currentUser.email,
            date: new Date().toLocaleDateString("it-IT"), //15/11/2018
            note: prenotazioneNote
        }).then(response => {
            $('.modal').modal('hide');
            $('#esitoPrenotazione').modal('show');
            const $titoloEsito = $('#titoloEsito');
            const $testoEsito = $('#testoEsito');
            let date = false;
            if (response.data || response.data.date) {
                date = response.data.date;
            }
            $titoloEsito.html(date ? 'Your reservation has been completed ' : 'Ops, during your reservation something has gone wrong');
            $testoEsito.html(date ? `Your reservation has been completed at ${window.dateFns.format(date, 'HH:mm:ss')}` : '¯\\_(ツ)_/¯');
        });
    } catch (e) {
        $('.modal').modal('hide');
        $('#esitoPrenotazione').modal('open');
        const $titoloEsito = $('#titoloEsito');
        const $testoEsito = $('#testoEsito');
        $titoloEsito.html('Ops, during your reservation something has gone wrong');
        $testoEsito.html(e);
    }

};

let htmlOptions = '';
window.foodGlobal.forEach(food => {
    htmlOptions = ` 
        '${htmlOptions} <option value="${food.name}"> ${food.name} </option>';
    `;
});
$('#panuozzoCibo').append(htmlOptions);

if (new window.User().logged) {

    Api('auth').post('check').then((response) => {
        if (!response.data) netlifyIdentity.logout();
    });
}

getSession().then(month => $("#month").text(month));

netlifyIdentity.on("init", () => checkUserStatus());

netlifyIdentity.on("login", () => {
    netlifyIdentity.close();
    checkUserStatus();
});

netlifyIdentity.on("logout", () => checkUserStatus());

netlifyIdentity.on("close", () => checkUserStatus());