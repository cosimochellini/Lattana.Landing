/**
 * function that return the current session
 * @returns {string} current session
 */
let getSession = () => {
    return (new Date().toLocaleString("en-us", { month: "long" }));
}


let currentUser = new User();

if(currentUser.logged){
    let $adminNavItem = $("#adminNavItem");
    $adminNavItem.show();

    $adminNavItem.text(currentUser.username);

}

$("#month").text(getSession());