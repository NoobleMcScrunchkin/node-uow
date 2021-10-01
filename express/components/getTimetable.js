const https = require('https');

module.exports = async (token) => {
    return new Promise((resolve, reject) => {
        https.get({
            host: "winchester.ombiel.co.uk",
            port: 443,
            path: "/campusm/sso/cal2/course_timetable?start=2021-10-04T00%3A00%3A00.000Z&end=2021-10-10T23%3A59%3A59.000Z",
            method: 'GET',
            headers: {
                "cookie": "cmAuthToken=" + token
            }
        }, (res) => {
            let str = "";
            if (res.statusCode != 200) {
                resolve([]);
            }
        
            res.on('data', (data) => {
                str += data;
            })
        
            res.on('end', () => {
                let timetable = JSON.parse(str).events;
                resolve(timetable);
            })
        });
    });
}