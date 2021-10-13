const express = require('express');
const debug = require('debug')('apiRoutes');
const { validateLogin } = require('../components/login');
const getTimetable = require('../components/getTimetable');
const api = express.Router();

api.post('/login', async (req, res) => {
    let profile = await validateLogin(req.body.token);
    if (profile) {
        req.session.profile = profile;
        res.cookie('token', req.body.token, { maxAge: 900000 });
        res.redirect("/");
    } else {
        res.redirect("/login?invalid=1");
    }
});

api.get('/getTimetable', async (req, res) => {
    res.send(JSON.stringify(await getTimetable(req.cookies.token, req.query.wc)));
});

module.exports = api;