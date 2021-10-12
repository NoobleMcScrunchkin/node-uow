const express = require('express');
const debug = require('debug')('storystrapRoutes');
const chalk = require('chalk');

const bookRouter = require('./bookRoutes');

storystrapRoutes = express.Router();

storystrapRoutes.get('/', async (req, res) => {
    res.render('storystrap/index', {
        nav: [
            { link: '/storystrap/books', title: 'Books' },
            { link: '/storystrap/authors', title: 'Authors' }
        ],
        title: 'Library'
    }, (err, html) => {
        if (err) {
            debug(chalk.red(err));
            return;
        }
        res.send(html);
    });
});

storystrapRoutes.use('/books', bookRouter);

module.exports = storystrapRoutes