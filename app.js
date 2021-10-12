const express = require("express");
const path = require('path');
const debug = require('debug')('app');
const chalk = require('chalk');
const morgan = require('morgan');

const getTimetable = require('./components/getTimetable');
const CMAUTHTOKEN = "TOKEN";

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
