const express = require("express");
const path = require('path');

const app = express();

app.set('view engine', 'pug')

app.use('/static', express.static('./static'));

app.get('/', (req, res) => {
    res.render('index', {test: "42069"}, (err, html) => {
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