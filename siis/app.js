
const cluster = require('cluster');
// const numCPUs = require('os').cpus().length;
const numCPUs = 1;

const express = require('express');
const session = require('express-session');
const passport = require('passport');
const Strategy = require('passport-facebook').Strategy;
const KakaoStrategy = require('passport-kakao').Strategy;

const config = require('./scripts/Config');

var path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const numberOfRowsInPage = 20;

if (cluster.ismaster) {

    for (var i = 0; i < numcpus; i++) {
        cluster.fork();
    }

    cluster.on('online', function (worker) {
        console.log('worker %d, online...'
            , worker.process.pid);
    });

    cluster.on('listening', function (worker, address) {
        console.log("a worker is now connected to " + address.address + ":" + address.port);
    });

    cluster.on('exit', function (worker, code, signal) {
        console.log('worker %d died (%s). restarting...'
            , worker.process.pid
            , signal || code);

        // cluster.fork();
    });

} else {

    fs = require('fs');

    var app = express();

    console.log(process.env);
    console.log('PORT: ' + process.env.PORT);
    console.log(process.argv);
	
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
    app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(session({
        //key: 'key'
        secret: config.sessionKey
        , resave: true             // don't save session if unmodified
        , saveUninitialized: true   // don't create session until something stored
        , cookie: {
            maxAge: 1000 * 60 * 60
        }
    }));

    // facebook
    passport.use(new Strategy({
        clientID: config.facebook.clientID,
        clientSecret: config.facebook.clientSecret,
        callbackURL: config.facebook.callbackURL,
        profileFields: ['id', 'displayName', 'photos', 'email']
    }, function (accessToken, refreshToken, profile, cb) {
        profile.picture = profile.photos ? profile.photos[0].value : 'images/user_male-128.png';
        return cb(null, profile);
    }));

    // kakao
    passport.use(new KakaoStrategy({
        clientID: config.kakao.clientID,
        callbackURL: config.kakao.callbackURL    
    }, function (accessToken, refreshToken, profile, cb) {
        console.log('kakao: ' + profile);
        profile['picture'] = profile._json.profile_image;
        console.log(profile.picture);
        return cb(null, profile);
    }));

    app.use(passport.initialize());
    app.use(passport.session());
	
    app.use('/', require('./routes/index'));
    app.use('/index', require('./routes/index'));
    app.use('/users', require('./routes/users'));
    app.use('/gate', require('./routes/gate'));
	app.use('/notice', require('./routes/notice'));
	app.use('/calendar', require('./routes/calendar'));
	app.use('/dataroom', require('./routes/dataroom'));
	app.use('/download', require('./routes/download'));
	app.use('/bambooforest', require('./routes/bambooforest'));
    app.use('/vote', require('./routes/vote'));
    app.use('/gl', require('./routes/gl'));
    app.use('/ti', require('./routes/ti'));
    app.use('/write', require('./routes/write'));
    
    passport.serializeUser(function (user, done) {
        console.log(user);
        done(null, user);
    });

    passport.deserializeUser(function (obj, done) {
        done(null, obj);
    });

    app.get('/login', function (req, res) {
        res.render('login');
    });

    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    }); 
    
    // facebook
    app.get('/login/facebook', passport.authenticate('facebook', config.facebookPermissions));

    app.get('/login/facebook/return',
        passport.authenticate('facebook', config.facebookPermissions),
        function (req, res) {
            console.log(req.query.code);
            res.redirect('/');
        });

    // kakao
    app.get('/auth/kakao', passport.authenticate('kakao', {
        failureRedirect: '/login'
    }), function (req, res) {
        console.log('auth/kakao');
        res.redirect('/');
    });

    app.get('/oauth', passport.authenticate('kakao', {
        failureRedirect: '#!/login'
    }), function (req, res) {
        console.log('oauth');
        res.redirect('/');
    });
    
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
	
    // set local function
	app.locals.RandomRange = function (min, max) {
		return Math.floor((Math.random() * max) + min);
    };

    /**
    * Normalize a port into a number, string, or false.
    */
    app.locals.NormalizePort = function (val) {
        var port = process.env.PORT || val; 
        port = parseInt(val, 10);

        if (isNaN(port)) {
            // named pipe
            return val;
        }

        if (port >= 0) {
            // port number
            return port;
        }

        return false;
    };
    
    app.locals.numberOfRowsInPage = numberOfRowsInPage;
    app.locals.dataRoomPath = './private / dataroom /';
	
	// '127.0.0.1' / '183.110.20.93'
    app.listen(80, function () {		
	    // console.log('Start Server: ' + cluster.worker.id);
	});
	
	// module.exports = app;
}