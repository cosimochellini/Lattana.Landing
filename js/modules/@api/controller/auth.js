const check = ({currentUser}) => {
    try {
        return currentUser.logged;
    } catch (e) {
        return false;
    }
};


export {
    check
}