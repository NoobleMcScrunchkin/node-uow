const express = require('express');
const debug = require('debug')('bookRoutes');
const chalk = require('chalk');

const bookRouter = express.Router();

const books = [
    {
        title: 'Sense and Sensibility',
        genre: 'Fiction',
        author: 'Jane Austen',
        read: false
    },
    {
        title: 'The secret Garden',
        genre: 'Children\'s Novel',
        author: 'Frances Hodgson Burnett',
        read: false
    },
    {
        title: 'The Sign of the Four',
        genre: 'Mystery',
        author: 'Sir Arthur Conan Doyle',
        read: false
    },
    {
        title: 'Les Miserables',
        genre: 'Historical Fiction',
        author: 'Victor Hugo',
        read: false
    },
    {
        title: 'War and Peace',
        genre: 'Historical Fiction',
        author: 'Lev Tolstoy',
        read: false
    },
];

bookRouter.route('/').get((req, res) => {
    res.render('storystrap/books', {
        nav: [
            { link: '/storystrap/books', title: 'Books' },
            { link: '/storystrap/authors', title: 'Authors' }
        ],
        title: 'Book List',
        books
    }, (err, html) => {
        if (err) {
            debug(chalk.red(err));
            return;
        }
        res.send(html);
    });
});

module.exports = bookRouter;