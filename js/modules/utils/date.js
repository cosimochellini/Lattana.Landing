import dateFns from 'date-fns';

/**
 * setta la data al giorno specifico senza secondi, minuti e ore
 * @param {Date} date
 * @returns {Date} data corretta
 */
const getFirstMoment = (date = new Date()) => {
    let firstMoment = dateFns.setHours(date, 0);
    firstMoment = dateFns.setMinutes(firstMoment, 0);
    firstMoment = dateFns.setSeconds(firstMoment, 0);
    return firstMoment;
};

/**
 * ritorna l'ultimo secondo di un giorno
 * @param {Date} date data
 * @returns {Date} data corretta
 */
const getLastMoment = (date = new Date()) => {
    let lastMoment = getFirstMoment(date);
    lastMoment = dateFns.addDays(lastMoment, 1);
    lastMoment = dateFns.addMilliseconds(lastMoment, -1);

    return lastMoment;
};

/**
 * Date 1/2 date ritorna le date corretter per fare la queru su db
 * @param {Date} dataInizio
 * @param {Date} dataFine
 * @returns {Array<Date>} [DataInizio, DataFine]
 */
const generateStartEnd = (dataInizio = new Date(), dataFine = dataInizio) => {
    return [
        getFirstMoment(dataInizio),
        getLastMoment(dataFine)
    ];
};


export {
    getFirstMoment,
    getLastMoment,
    generateStartEnd
}