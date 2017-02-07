var express = require('express');
var router = express.Router();

var path = require('path');
var EZString = require('./../private/scripts/EZString');
var mysql = require('mysql');
var async = require('async');

const numberOfRowsInPage = 20;

// Deprecated
function insert(notices) {
    async.waterfall([
        function (callback) {
            var connection = mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: 'Nmn372299!',
                database: 'hsc'
            });

            connection.connect(function (_err) {
                if (_err) {
                    console.log(_err);
                    callback(err);                    
                }
                else {
                    callback(null, connection);
                }
            });        
        },

        function (connection, callback) {
            async.eachSeries(notices, function (notice, _callback) {
                var index = notice['Index'];
                var parentDir = path.dirname(module.parent.filename);
                var finalPath = parentDir + '\\public\\html\\' + index + '.html';
                console.log(finalPath);

                fs.readFile(finalPath, 'utf8', function (err, data) {
                    if (err) {
                        _callback(err);
                    }
                    else {
                        
                        connection.query('INSERT INTO board set Author=?, Title=?, Contents=?, CreatedAt=?, UpdatedAt=?', [notice['Author'], notice['Title'], data, notice['Date'], notice['Date']], function (err, results) {
                                if (err) {
                                    _callback(err);
                                }
                                else {
                                    _callback(null);
                                }
                            });
                    }                    
                });
            }, function (err) {                
                callback(err);
            });
        }
    ], function (err, results) {
        if (err) {
            console.log('final callback');
            console.log(err);
            // console.log(err);
        }
        else {
            console.log('done');
        }
    });
}

function format(val) {
    var date = new Date(val);
    return date.toFormat('YYYY.MM.DD');
};

function createConnection(callback) {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Nmn372299!',
        database: 'hsc'
    });

    callback(null, connection);
};

function waitForConnect(connection, callback) {
    connection.connect(function (_err) {
        if (_err) {
            callback(_err);
        }
        else {
            callback(null, connection);
        }
    });
}

function selectData(connection, callback) {
    var onFinishQuery = function (err, results) {
        if (err) callback(err);
        else callback(null, results);
    };

    var query = 'select Idx, CreatedAt, Title, Author from board order by Idx desc limit 1000';
    connection.query(query, onFinishQuery);
}

/* GET home page. */
router.get('/', function (req, res, next) {    
    var page = 1;
    page = req.query.page;
    if (page == undefined) {
        page = 1;
    }

    async.waterfall([
        createConnection
        , waitForConnect
        , selectData
    ], function (err, results) {
        if (err) console.log('error: ' + err);
        else {            
            var notices = results;
            var numberOfPages = Math.ceil(notices.length / 20);
            notices = notices.slice((page - 1) * numberOfRowsInPage, page * numberOfRowsInPage);

            for (var i = 0; i < notices.length; i++) {
                notices[i]['CreatedAt'] = format(notices[i]['CreatedAt']);
            }

            res.render('index', {
                title: '한양대학교 산업융학학부 15학번'
                , list: notices
                , page: page
                , numberOfPages: numberOfPages
            });
        }
    });
    
    /*
    if (global.TEMP_DATA == null)
    {
        var parentDir = path.dirname(module.parent.filename);
        var finalPath = parentDir + '\\public\\files\\temp.json';

        fs.readFile(finalPath, 'utf8', function (err, data) {
            if (err) {
                console.log(err);
            }
            else {                
                var str = data.replaceNewLineChars(data);
                str = str.ltrim();
                str = str.rtrim();
                global.TEMP_DATA = JSON.parse(str);

                var notices = global.TEMP_DATA['notices'];
                notices.sort(function (a, b) {
                    return a['Index'] - b['Index'];
                });

                insert(notices);
                //var numberOfPages = Math.ceil(notices.length / 20);
                //notices = notices.slice((page - 1) * numberOfRowsInPage, page * numberOfRowsInPage);
                
                //res.render('index'
                //    , {
                //        title: '한양대학교 산업융학학부 15학번'
                //        , list: notices
                //        , page: page
                //        , numberOfPages: numberOfPages
                //    });
            }
        });
    }
    else
    {
        var notices = global.TEMP_DATA['notices'];
        var numberOfPages = Math.ceil(notices.length / 20);
        notices = notices.slice((page - 1) * numberOfRowsInPage, page * numberOfRowsInPage);

        console.log(numberOfPages);
        res.render('index', {
            title: '한양대학교 산업융학학부 15학번'
            , list: notices
            , page: page
            , numberOfPages: numberOfPages
        });
    }*/

    /*
    var finalPath = parentDir + '\\public\\markdown';
    fs.readdir(finalPath, function (err, files) {
		res.render('index', { title: '한양대학교 산업융학학부 15학번', list: files });
    });
    */
});

module.exports = router;