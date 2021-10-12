const https = require('https');

module.exports = async (token, startWeek) => {
    return new Promise((res, rej) => {res([])});
    return new Promise((resolve, reject) => {
        let start;
        if (startWeek) {
            start = new Date(startWeek.toString());
        } else {
            start = new Date();
        }
        let dayOfWeek = start.getDay();
        start.setDate(start.getDate() - dayOfWeek + 1);
        start.setHours(1, 0, 0, 0);
        if (dayOfWeek == 0) {
            start.setDate(start.getDate() - 7);
        }
        let end = new Date(start);
        end.setDate(end.getDate() + 6);
        end.setHours(23, 59, 59, 999);
        let dateRange = {
            start: start,
            end: end
        }
        let timetable = []

        https.get({
            host: "winchester.ombiel.co.uk",
            port: 443,
            path: `/campusm/sso/cal2/course_timetable?start=${dateRange.start.toISOString()}&end=${dateRange.end.toISOString()}`,
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
                let allTimetable = JSON.parse(str).events;
                for (let i = 0; i < allTimetable.length; i++) {
                    let element = allTimetable[i];
                    let startDate = new Date(element.start);
                    let endDate = new Date(element.end);
                    if (startDate >= dateRange.start && endDate < dateRange.end) {
                        timetable.push(element);
                    }
                }
                resolve(timetable);
            })
        });
    });
}