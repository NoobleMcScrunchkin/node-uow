const express = require("express");
const path = require('path');
const https = require('https');
const getTimetable = require('./components/getTimetable');
const CMAUTHTOKEN = "eyJhbGciOiJSUzI1NiJ9.eyJqdGkiOiJMN2J0QlluV0NFSGxyWFV2QzZ3M0l3IiwiaWF0IjoxNjMzMDIzMzU3LCJpc3MiOiJFeExpYnJpcyIsInN1YiI6IkNhbXB1c01Vc2VyIiwiZXhwIjoxNjM1NjE1MzU3LCJ1c2VybmFtZSI6IksuQXNsZXR0LjIwIiwibWFpbCI6IksuQXNsZXR0LjIwQHVuaW1haWwud2luY2hlc3Rlci5hYy51ayIsImZpcnN0TmFtZSI6IktpZXJhbiIsImxhc3ROYW1lIjoiQXNsZXR0IiwiY21QZXJzb25JZCI6NDU4Mjk2OSwiY21PcmdDb2RlIjoxNTcsImNtUHJvZmlsZUdyb3VwSWQiOjczMDksImNtSW50ZWdyYXRpb25Qcm9maWxlSWQiOjI0ODEsImV4dHJhQXR0cnMiOnsiQWxtYUlEIjoiMjAwNzMxMiIsImVtcGxveWVlSUQiOiIyMDA3MzEyIiwidXNlcm5hbWUiOiJLLkFzbGV0dC4yMCJ9LCJhdXRoVHlwZSI6IkNNQVVUSCIsInJvbGVzSGFzaCI6Ik1OMERCUXBvdW1nT1E5RVl6cDRiL1dQWjZscEpsWE9XWEhQZW5IQzdhSm89In0.Lgq1H94JZ5QNm52NvUXb1pRQgCctulj3EtM6fiKC7nBQM4Pd8tvra-VGHQ1wG2_w6SZq9aC8gJkH7giSEuijNzhVbCebk6I4k06PXq6Xaojd3Rn36QHEM2OGlh1TuIGcL-TX5flPPWr7jxmQ-vqvjaTbFjoxPs67y7u5S20qjtvnIBwesMPKG2yAx-EzLlB5CmWLier1x4cxt39li5tLNpZ6CxYJ3WWr36agdAOy6IEmI0bu2Jchxr0iB2uQmTKMHr_sOijmzCJotbnPqGnNt8FL8TE7ugKZ-kWRLQbqcSgWKiFO92bbqM0vQEKPF9RBOMiKgwnMOZrtBVizl00jjQ";

Number.prototype.pad = function(size) {
    var s = String(this);
    while (s.length < (size || 2)) {s = "0" + s;}
    return s;
}

const app = express();

app.set('view engine', 'pug')

app.use('/static', express.static('./static'));

app.get('/', (req, res) => {
    res.render('index', {pageUrl: "/", test: "42069"}, (err, html) => {
        if (err) {
            console.error(err);
            return;
        }
        res.send(html);
    });
});

app.get('/timetable', async (req, res) => {
    res.render('timetable', {pageUrl: "/timetable", timetable: await getTimetable(CMAUTHTOKEN)}, (err, html) => {
        if (err) {
            console.error(err);
            return;
        }
        res.send(html);
    });
});

app.listen(3000, () => {
    console.log('listening on port 3000');
});