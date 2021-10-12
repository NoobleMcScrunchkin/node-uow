const express = require("express");
const path = require('path');
const debug = require('debug')('app');
const chalk = require('chalk');
const morgan = require('morgan');

const getTimetable = require('./components/getTimetable');
const CMAUTHTOKEN = "eyJhbGciOiJSUzI1NiJ9.eyJqdGkiOiJMN2J0QlluV0NFSGxyWFV2QzZ3M0l3IiwiaWF0IjoxNjMzMDIzMzU3LCJpc3MiOiJFeExpYnJpcyIsInN1YiI6IkNhbXB1c01Vc2VyIiwiZXhwIjoxNjM1NjE1MzU3LCJ1c2VybmFtZSI6IksuQXNsZXR0LjIwIiwibWFpbCI6IksuQXNsZXR0LjIwQHVuaW1haWwud2luY2hlc3Rlci5hYy51ayIsImZpcnN0TmFtZSI6IktpZXJhbiIsImxhc3ROYW1lIjoiQXNsZXR0IiwiY21QZXJzb25JZCI6NDU4Mjk2OSwiY21PcmdDb2RlIjoxNTcsImNtUHJvZmlsZUdyb3VwSWQiOjczMDksImNtSW50ZWdyYXRpb25Qcm9maWxlSWQiOjI0ODEsImV4dHJhQXR0cnMiOnsiQWxtYUlEIjoiMjAwNzMxMiIsImVtcGxveWVlSUQiOiIyMDA3MzEyIiwidXNlcm5hbWUiOiJLLkFzbGV0dC4yMCJ9LCJhdXRoVHlwZSI6IkNNQVVUSCIsInJvbGVzSGFzaCI6Ik1OMERCUXBvdW1nT1E5RVl6cDRiL1dQWjZscEpsWE9XWEhQZW5IQzdhSm89In0.Lgq1H94JZ5QNm52NvUXb1pRQgCctulj3EtM6fiKC7nBQM4Pd8tvra-VGHQ1wG2_w6SZq9aC8gJkH7giSEuijNzhVbCebk6I4k06PXq6Xaojd3Rn36QHEM2OGlh1TuIGcL-TX5flPPWr7jxmQ-vqvjaTbFjoxPs67y7u5S20qjtvnIBwesMPKG2yAx-EzLlB5CmWLier1x4cxt39li5tLNpZ6CxYJ3WWr36agdAOy6IEmI0bu2Jchxr0iB2uQmTKMHr_sOijmzCJotbnPqGnNt8FL8TE7ugKZ-kWRLQbqcSgWKiFO92bbqM0vQEKPF9RBOMiKgwnMOZrtBVizl00jjQ";

const port = process.env.PORT || 3000; 

Number.prototype.pad = function(size) {
    var s = String(this);
    while (s.length < (size || 2)) {s = "0" + s;}
    return s;
}

const app = express();
app.use(morgan('tiny'));
app.set('views', './views');
app.set('view engine', 'pug');
app.use('/static', express.static('./static'));
app.use('/static/js', express.static(path.join(__dirname, "/node_modules/bootstrap/dist/js")));
app.use('/static/css', express.static(path.join(__dirname, "/node_modules/bootstrap/dist/css")));
app.use('/static/css', express.static(path.join(__dirname, "/node_modules/bootstrap-icons/font")));
app.use('/static/js', express.static(path.join(__dirname, "/node_modules/jquery/dist")));

app.get('/getTimetable', async (req, res) => {
    res.send(JSON.stringify(await getTimetable(CMAUTHTOKEN, req.query.wc)));
});

app.get('/', async (req, res) => {
    res.render('index', {pageUrl: "/", test: "From app.js"}, (err, html) => {
        if (err) {
            debug(chalk.red(err));
            return;
        }
        res.send(html);
    });
});

app.get('/timetable', async (req, res) => {
    res.render('timetable', {pageUrl: "/timetable", timetable: await getTimetable(CMAUTHTOKEN)}, (err, html) => {
        if (err) {
            debug(chalk.red(err));
            return;
        }
        res.send(html);
    });
});

app.get('/attendance', async (req, res) => {
    res.render('attendance', {pageUrl: "/attendance", timetable: await getTimetable(CMAUTHTOKEN)}, (err, html) => {
        if (err) {
            debug(chalk.red(err));
            return;
        }
        res.send(html);
    });
});

app.get('/tetris', async (req, res) => {
    res.render('tetris', (err, html) => {
        if (err) {
            debug(chalk.red(err));
            return;
        }
        res.send(html);
    });
});

app.get('/logout', async (req, res) => {
    res.redirect("/");
});

app.use((req, res) => {
    res.statusCode = 404;
    res.render('404', (err, html) => {
        if (err) {
            debug(chalk.red(err));
            return;
        }
        res.send(html);
    });
})

app.listen(port, () => {
    console.log(`listening on port ${chalk.green(port.toString())}`);
});