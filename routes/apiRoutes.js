const express = require('express');
const getTimetable = require('../components/getTimetable');
const CMAUTHTOKEN = "secret";

const api = express.Router();

api.get('/getTimetable', async (req, res) => {
    res.send(JSON.stringify(await getTimetable(CMAUTHTOKEN, req.query.wc)));
});

module.exports = api;