const express = require('express');
const debug = require('debug')('bookRoutes');
const chalk = require('chalk');

const mainRoutes = express.Router();

const getTimetable = require('../components/getTimetable');
const CMAUTHTOKEN = "secret";
 
mainRoutes.get('/', async (req, res) => {
    res.render('index', {pageUrl: "/", test: "From app.js"}, (err, html) => {
        if (err) {
            debug(chalk.red(err));
            return;
        }
        res.send(html);
    });
});

mainRoutes.get('/timetable', async (req, res) => {
    res.render('timetable', {pageUrl: "/timetable", timetable: await getTimetable(CMAUTHTOKEN)}, (err, html) => {
        if (err) {
            debug(chalk.red(err));
            return;
        }
        res.send(html);
    });
});

mainRoutes.get('/attendance', async (req, res) => {
    res.render('attendance', {pageUrl: "/attendance", timetable: await getTimetable(CMAUTHTOKEN)}, (err, html) => {
        if (err) {
            debug(chalk.red(err));
            return;
        }
        res.send(html);
    });
});

mainRoutes.get('/logout', async (req, res) => {
    res.redirect("/");
});

module.exports = mainRoutes;