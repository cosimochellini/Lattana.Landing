/**
 * function that return the current session
 * @returns {string} current session
 */
let getSession = () => {
    var date = new Date(),
        locale = "en-us",
        month = date.toLocaleString(locale, { month: "long" });

    document.write(month);
}