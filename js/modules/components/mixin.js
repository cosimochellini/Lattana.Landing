//setto dei valori di default per la webapp che vengono importate in tutte le viste
const mixin = {};

/**
 * impostazioni standard che tutte le tabelle usano,
 * per fare un override delle impostazioni usare
 * Object.assign(standard.table, { sortBy: 'Id', sortDesc: true, fixed: true });
 */
mixin.table = {
    perPage: 20,
    small: true
};

/**
 * funzione che ritorna se visualizzare o meno i pulsanti per navigare la tabella
 * @param {Array<Object<>>} items
 * @returns {boolean}
 */
mixin.showPagination = (items = []) => {
    return items.length / parseInt(mixin.table.perPage) > 1;
};


/**
 * funzione che data una stringa, separe con spazi le lettere in maiuscolo
 *
 * @param {string} item una stringa in camel case
 *
 * @return {string} stringa "umanizzata"
 */
mixin.humanize = (item) => {
    if (!item) return '';
    return item.match(/[A-Z][a-z]+/g).join(' ');
};

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

    // ReSharper disable once MissingHasOwnPropertyInForeach
    for (let prop in item) {
        if (!exceptions.includes(prop))
            fields.push({key: prop, sortable: true, class: mixin.classField(prop)});
    }
    return fields;
};

/**
 * Array di campi che non devono essere allineati al centro,
 * ma con la classe specificata
 */
mixin.centeredFieldException = [
    {
        prop: 'note',
        class: 'left-center'
    }];

/**
 * ottimizza l'array centeredFieldException di oggetto ritornando un array di stringhe,
 * più veloce durante l'esecuzione
 */
mixin.mapperCenteredFieldException = mixin.centeredFieldException.map(x => x.prop);

/**
 * Ritorna la classe corretta per la visualizzazione della tabella
 * @param {string} prop
 *
 * @return {string}
 */
mixin.classField = prop => {
    //controllo con l'array mappato per una questione di velocità
    return !mixin.mapperCenteredFieldException.includes(prop.toLowerCase())
        ? 'text-center'
        : mixin.centeredFieldException.find(item => item.prop === prop.toLowerCase()).class || '';
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
        el: '#app',
        data: () => {
            return {
                items: [],
                fieldException: [],
                currentPage: 0,
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
        computed: {
            showPagination() {
                return mixin.showPagination(this.tableItems);
            },

        },
        filters: {
            date: (item, format) => {
                return mixin.toDate(item, format);
            },
            humanize: item => {
                return mixin.humanize(item);
            }
        },
        components: {
            vuejsDatepicker
        }
    }
};