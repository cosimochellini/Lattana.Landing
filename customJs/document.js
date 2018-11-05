/**
 * function that return the current session
 * @returns {string} current session
 */
let getSession = async () => {
    return (new Date().toLocaleString("en-us", { month: "long" }));
}

let checkUserStatus = async () => {
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
}

let reservePanuozzo = () => {
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

    $("#panuozzoEmail").attr('value',currentUser.email)
    $("#panuozzoName").attr('value',currentUser.username)

}


getSession().then(month => $("#month").text(month));

netlifyIdentity.on("init", user => checkUserStatus());

netlifyIdentity.on("login", user => {
    checkUserStatus();
    netlifyIdentity.close();
});

netlifyIdentity.on("logout", () => checkUserStatus());

netlifyIdentity.on("close", () => checkUserStatus());