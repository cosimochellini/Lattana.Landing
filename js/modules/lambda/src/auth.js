require('dotenv').config();
import {check} from "../../@api/controller/auth";
import {_response, importData} from "../../@api/core"

exports.handler = async function (event, context) {
    let data = importData(event, context, () => console.log('nessun callback'));

    let responeData;
    switch (data.action) {

        case '/check':
            responeData = await check(data);
            break;
        default:
            console.log('invalid action => ', data.action);
            break;
    }

    return _response(200, responeData);
};