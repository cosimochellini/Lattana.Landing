/**
 * prenota un panuozzo per oggi, creando anche la prenotazione
 * @param {Object} param0 l'oggetto data generato da importData(...)
 * @param {Object} param0.identity
 * @param {User} param0.currentUser
 * @param {Object} param0.body
 * @param {boolean} param0.authorized
 * @param {Object} param0.db
 * @param {Model<any, {}>} param0.db.prenotazioneCibo context della tabella prenotazioneCibo
 * @param {Model<any, {}>} param0.db.prenotazioni context della tabella prenotazioni
 * @returns {Promise<Array<Object>>} l'esito
 */
const queryFind = async ({body, db}) => {
    try {
        const {query, table} = body;

        return await db[table].find(query);

    } catch (e) {
        console.log(e);
        return [];
    }
};

export {
    queryFind
}