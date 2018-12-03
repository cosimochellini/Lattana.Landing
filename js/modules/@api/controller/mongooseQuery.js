/**
 * prenota un panuozzo per oggi, creando anche la prenotazione
 * @param {Object} param0 l'oggetto data generato da importData(...)
 * @param {Object} param0.body
 * @param {Object} param0.db
 * @param {Model<any, {}>} param0.db.prenotazioneCibo context della tabella prenotazioneCibo
 * @param {Model<any, {}>} param0.db.prenotazioni context della tabella prenotazioni
 * @returns {Promise<Array<Object>>} l'esito
 */
const find = async ({body, db}) => {
    try {
        const {query, table} = body;

        return await db[table].find(query);

    } catch (e) {
        console.log('find eccezione', e);
        return [];
    }
};
/**
 * prenota un panuozzo per oggi, creando anche la prenotazione
 * @param {Object} param0 l'oggetto data generato da importData(...)
 * @param {Object} param0.body
 * @param {Object} param0.db
 * @param {Model<any, {}>} param0.db.prenotazioneCibo context della tabella prenotazioneCibo
 * @param {Model<any, {}>} param0.db.prenotazioni context della tabella prenotazioni
 * @returns {Object} l'esito
 */
const findOneAndUpdate = async ({body, db}) => {
    try {
        const {update, table, filter, option = {}} = body;

        return await db[table].findOneAndUpdate(filter, update, option);

    } catch (e) {
        console.log('findOneAndUpdate eccezione', e);
        return [];
    }
};

/**
 * esegue l'eliminazione di un oggetto tramite la libreria mongoodse
 * @param {Object} param0 l'oggetto data generato da importData(...)
 * @param {Object} param0.body
 * @param {Object} param0.db
 * @param {Model<any, {}>} param0.db.prenotazioneCibo context della tabella prenotazioneCibo
 * @param {Model<any, {}>} param0.db.prenotazioni context della tabella prenotazioni
 * @returns {Object} l'esito
 */
const findOneAndDelete = async ({body, db}) => {
    try {
        const {table, filter, option = {}} = body;

        return await db[table].findOneAndDelete(filter, option);

    } catch (e) {
        console.log('findOneAndDelete eccezione', e);
        return [];
    }
};


export {
    find,
    findOneAndUpdate,
    findOneAndDelete
}