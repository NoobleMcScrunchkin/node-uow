const { json } = require("express");
const https = require("https");

const baseUrl = "https://winchester.ombiel.co.uk";
const stateUrl = baseUrl + "/campusm/sso/state";
const appProfileUrl = baseUrl + "/campusm/appprofile/{orgCode}";

async function getOrgCode() {
    return new Promise((resolve, reject) => {
        https.get(stateUrl, (res) => {
            let str = "";

            res.on('data', (data) => {
                str += data;
            });

            res.on('end', () => {
                if (res.statusCode == 200) {
                    resolve({
                        status: 200,
                        orgCode: JSON.parse(str).orgCode
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

async function getProfile(orgCode) {
    return new Promise((resolve, reject) => {
        https.get(appProfileUrl.replace("{orgCode}", orgCode), (res) => {
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
                        url: appProfileUrl
                    });
                }                     
            });
        }).on('error', (e) => {
            console.error(e);
        });
    });
}

module.exports = async function () {
    return await new Promise(async (resolve, reject) => {
        let orgCodeObj = await getOrgCode();
        if (orgCodeObj.status != 200) {
            resolve(false);
        }
        let orgCode = orgCodeObj.orgCode;

        let appProfileObj = await getProfile(orgCode);
        if (appProfileObj.status != 200) {
            resolve(false);
        }
        resolve(appProfileObj.profile);
    });
}