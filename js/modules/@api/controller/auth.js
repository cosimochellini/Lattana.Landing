const check = ({currentUser}) => {
    try {
        return currentUser.logged;
    } catch (e) {
        console.log(e);
        return false;
    }
};


export {
    check
}