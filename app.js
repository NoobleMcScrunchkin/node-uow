const express = require("express");
const morgan = require('morgan');
const debug = require('debug')('app');
const path = require('path');
const chalk = require('chalk');

const port = process.env.PORT || 3000; 

Number.prototype.pad = function(size) {
    var s = String(this);
    while (s.length < (size || 2)) {s = "0" + s;}
    return s;
};

const app = express();
app.use(morgan('tiny'));

app.set('views', './views');
app.set('view engine', 'pug');

app.use('/static', express.static('./static'));
app.use('/static/js', express.static(path.join(__dirname, "/node_modules/bootstrap/dist/js")));
app.use('/static/css', express.static(path.join(__dirname, "/node_modules/bootstrap/dist/css")));
app.use('/static/css', express.static(path.join(__dirname, "/node_modules/bootstrap-icons/font")));
app.use('/static/js', express.static(path.join(__dirname, "/node_modules/jquery/dist")));

const mainRouter = require('./routes/mainRoutes');
app.use('/', mainRouter);

const apiRouter = require('./routes/apiRoutes');
app.use('/api', apiRouter);

const storystrapRouter = require('./routes/storystrapRoutes');
app.use('/storystrap', storystrapRouter);

app.use((req, res) => {
    res.statusCode = 404;
    res.render('404', (err, html) => {
        if (err) {
            debug(chalk.red(err));
            return;
        }
        res.send(html);
    });
});

app.listen(port, () => {
    console.log(`listening on port ${chalk.green(port.toString())}`);
});
