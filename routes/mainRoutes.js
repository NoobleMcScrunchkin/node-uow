const express = require('express');
const debug = require('debug')('mainRoutes');
const chalk = require('chalk');
const getTimetable = require('../components/getTimetable');

const mainRoutes = express.Router();

mainRoutes.get('/', async (req, res) => {
    console.log(req.session);
    res.render('index', {
        token: req.cookies.token,
        session: req.session,
        pageUrl: "/", 
        test: "From app.js"
    }, (err, html) => {
        if (err) {
            debug(chalk.red(err));
            return;
        }
        res.send(html);
    });
});

mainRoutes.get('/timetable', async (req, res) => {
    res.render('timetable', {
        token: req.cookies.token,
        session: req.session,
        pageUrl: "/timetable", 
        timetable: await getTimetable(req.cookies.token)
    }, (err, html) => {
        if (err) {
            debug(chalk.red(err));
            return;
        }
        res.send(html);
    });
});

mainRoutes.get('/attendance', async (req, res) => {
    res.render('attendance', {
        token: req.cookies.token,
        session: req.session,
        pageUrl: "/attendance", 
        timetable: await getTimetable(req.cookies.token)
    }, (err, html) => {
        if (err) {
            debug(chalk.red(err));
            return;
        }
        res.send(html);
    });
});

mainRoutes.get('/login', async (req, res) => {
    res.render('login', {
        token: req.cookies.token,
        session: req.session,
        pageUrl: "/login",
        invalid: req.query.invalid
    }, (err, html) => {
        if (err) {
            debug(chalk.red(err));
            return;
        }
        res.send(html);
    });
});

mainRoutes.get('/logout', async (req, res) => {
    res.clearCookie('token');
    res.redirect("/");
});

module.exports = mainRoutes;