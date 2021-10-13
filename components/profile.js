const https = require("https");

const baseUrl = "winchester.ombiel.co.uk";
const stateUrl = "/campusm/sso/state";

async function getState(token) {
    return new Promise((resolve, reject) => {
        https.get({
            host: baseUrl,
            port: 443,
            path: stateUrl,
            method: 'GET',
            headers: {
                "cookie": "cmAuthToken=" + token
            }
        }, (res) => {
            let str = "";

            res.on('data', (data) => {
                str += data;
            });

            res.on('end', () => {
                if (res.statusCode == 200) {
                    resolve({
                        status: 200,
                        profile: JSON.parse(str)
                    });
                } else {
                    reject({
                        status: res.statusCode,
                        url: stateUrl
                    });
                }                
            });
        }).on('error', (e) => {
            console.error(e);
        });
    });
}

module.exports.getState = getState;