//setto dei valori di default per la webapp che vengono importate in tutte le viste
const mixin = {};

/**
 *funzione che dato un oggetto, genera un array di stringhe con i nome delle sue proprietà,
 * se viene passsato exceptions non aggiungerà quelle proprietà nel array di ritorno
 *
 * @param {Object<>} item
 * @param {Array<string>} exceptions
 *
 * @return {Array<string>}
 */
mixin.fields = (item, exceptions = []) => {
    const fields = [];

    for (let prop in item) {
        if (!exceptions.includes(prop))
            fields.push({key: prop, sortable: true});
    }
    return fields;
};

/**
 *funzione che data una data(item) ritorna una stringa della data formattata,
 * se viene passato il format, viene formattato nel modo scelto
 *
 * @param {Object<>} item
 * @param {string} format
 *
 * @return {string} stringa formattata correttamente
 */
mixin.toDate = (item, format = 'DD/MM HH:mm') => {

    if (!item) return '';

    //controllo se la data è 2018-02-09T10:15: etc oppure /Date(089382092802)/
    if (item[0] === '/')
        item = parseInt(item.substr(6, item.length - 11)) * 1000;

    return window.dateFns.format(window.dateFns.parse(item), format);
};


/**
 * funzione che fa un sort di oggetti
 *
 * @param {Array<Object<>>} items
 * @param {function(*, *): number} criterio
 *
 * @return {Array<Object<>>}
 */
mixin.sort = (items = [], criterio = (a, b) => a - b) => {

    try {
        return items.sort(criterio);
    } catch (e) {
        return [];
    }
};

/**
 *Questo oggetto serve a istanziare delle proprietà standard
 * lo eseguo come funzione per prevenire che vada in errore
 * nella pagine che non implementano il mixin
 *in tutte le istanze di Vue
 */
mixin.mixin = () => {
    return {
        data: () => {
            return {
                fieldException: [],
                table: mixin.table
            }
        },
        methods: {
            sort(data) {
                return mixin.sort(data);
            },
            tableFields(items) {
                return mixin.fields(items, this.fieldException);
            }
        },
        filters: {
            date: (item, format) => {
                return mixin.toDate(item, format);
            }
        },
        components: {
            vuejsDatepicker
        }
    }
};