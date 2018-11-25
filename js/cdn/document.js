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
    const [dataInizio, dataFine] = window.generateStartEnd(new Date(2018, 1, 1), new Date(2019, 1, 1));

    const response = await Api('data').post('find', {
        query: {
            date: {$gte: dataInizio, $lt: dataFine},
            email: 'cosimo.chellini@gmail.com'
        },
        table: "prenotazioneCibo"
    });

    return response;
};

let openReservePanuozzo = () => {
    let currentUser = new User();
    let $alertReservePanuozzo = $("#alertReservePanuozzo");
    let $formServePanuozzo = $("#formServePanuozzo");

    if (!currentUser.logged) {
        $formServePanuozzo.hide();
        $alertReservePanuozzo.show();
        return;
    }

    $formServePanuozzo.show();
    $alertReservePanuozzo.hide();

    $("#panuozzoEmail").attr('value', currentUser.email);
    $("#panuozzoName").attr('value', currentUser.username);

};

let reservePanuozzo = () => {
    const prenotazionePezzi = parseInt($('#panuozzoPiece').val());

    const prenotazioneCibo = $('#panuozzoCibo').val();

    const prenotazioneNote = $('#panuozzoMessage').val();

    const currentUser = new User();

    Api('data').post('reservePanuozzoToday', {
        pezzi: prenotazionePezzi,
        cibo: prenotazioneCibo,
        username: currentUser.username,
        email: currentUser.email,
        date: new Date().toLocaleDateString("it-IT"), //15/11/2018
        note: prenotazioneNote
    }).then(response => {
        alert('success');
    });

};
if(new window.User().logged){

    Api('auth').post('check').then((response) => {
        if(!response) netlifyIdentity.logout();
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