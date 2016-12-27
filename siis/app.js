var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var notice = require('./routes/notice');
var calendar = require('./routes/calendar');
var dataroom = require('./routes/dataroom');
var download = require('./routes/download');
var bambooforest = require('./routes/bambooforest');
var vote = require('./routes/vote');

fs = require('fs');

var app = express();

fs = require('fs');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// app.engine('html', require('ejs').renderFile);
// app.set('view engine', 'html');

/*
app.set('view engine', 'md');
app.engine('md', function (path, options, fn) {
    fs.readFile(path, 'utf8', function (err, str) {
        if (err) return fn(err);
        var html = marked.parse(str).replace(/\{([^}]+)\}/g, function (_, name) {
            return escapeHtml(options[name] || '');
        });
        fn(null, html);
    });
});
*/

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/notice', notice);
app.use('/calendar', calendar);
app.use('/dataroom', dataroom);
app.use('/download', download);
app.use('/bambooforest', bambooforest);
app.use('/vote', vote);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

app.locals.RandomRange = function (min, max) {
    return Math.floor((Math.random() * max) + min);
};

// '127.0.0.1'
app.listen(3000, '183.110.20.93', function () {
    console.log('Start Server');
});

module.exports = app;