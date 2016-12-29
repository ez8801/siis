
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

const express = require('express');
var path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

if (cluster.isMaster) {
	for (var i = 0; i < numCPUs; i++) {
		cluster.fork();
	}
	
	cluster.on('online', function (worker) {
		console.log('worker %d, online...'
			, worker.process.pid);
	});

	cluster.on('listening', function (worker, address) {
		console.log("A worker is now connected to " + address.address + ":" + address.port);
	});

	cluster.on('exit', function (worker, code, signal) {
		console.log('worker %d died (%s). restarting...'
			, worker.process.pid
			, signal || code);

		cluster.fork();
	});
}
else {

	fs = require('fs');
	
	var app = express();
	
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
	
	app.use('/', require('./routes/index'));
	app.use('/users', require('./routes/users'));
	app.use('/notice', require('./routes/notice'));
	app.use('/calendar', require('./routes/calendar'));
	app.use('/dataroom', require('./routes/dataroom'));
	app.use('/download', require('./routes/download'));
	app.use('/bambooforest', require('./routes/bambooforest'));
	app.use('/vote', require('./routes/vote'));
	
	// catch 404 and forward to error handler
	app.use(function (req, res, next) {
		var err = new Error('Not Found');
		err.status = 404;
		next(err);
	});
	
	// error handler
	app.use(function (err, req, res, next) {
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
	
	// '127.0.0.1' / '183.110.20.93'
	app.listen(3000, function () {		
		console.log('Start Server: ' + cluster.worker.id);
	});
	
	// module.exports = app;
}