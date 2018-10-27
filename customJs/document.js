/**
 * function that return the current session
 * @returns {string} current session
 */
let getSession = () => {
    document.write(new Date().toLocaleString("en-us", { month: "long" }));
}