var express = require('express');
var router = express.Router();

var EZDB = require('../scripts/EZDB');
var async = require('async');

const numberOfRowsInPage = 20;

// Deprecated
/*
function insert(notices) {
    async.eachSeries(notices, function (notice, _callback) {
        var index = notice['Index'];
        var parentDir = path.dirname(module.parent.filename);
        var finalPath = parentDir + '\\public\\html\\' + index + '.html';
        
        fs.readFile(finalPath, 'utf8', function (err, data) {
            if (err) _callback(err);            
            else {
                connection.query('INSERT INTO board set Author=?, Title=?, Contents=?, CreatedAt=?, UpdatedAt=?', [notice['Author'], notice['Title'], data, notice['Date'], notice['Date']], function (err, results) {
                    if (err) _callback(err);                    
                    else _callback(null);                    
                });
            }
        });
    }, function (err) {
        callback(err);
    });
}
*/

function format(val) {
    var date = new Date(val);
    return date.toFormat('YYYY.MM.DD');
};

/* GET home page. */
router.get('/', function (req, res, next) {
    var page = 1;
    page = req.query.page;
    if (page == undefined) {
        page = 1;
    }

    async.parallel([
        function (callback) {
            var sql = 'select count(*) from board';
            EZDB.query(sql, function (err, results) {
                if (err) callback(err);                
                else callback(null, results[0]['count(*)']);
            });
        }
        , function (callback) {
            var offset = (page - 1) * numberOfRowsInPage;
            var sql = 'select Idx, CreatedAt, Title, Author from board order by Idx desc limit ' + offset + ', ' + numberOfRowsInPage;
            EZDB.query(sql, function (err, results) {
                if (err) callback(err);                
                else callback(null, results);
            });
        }
    ], function (err, results) {
        if (err) throw err;
        else {            
            var rowCount = results[0];
            var notices = results[1];
            var numberOfPages = Math.ceil(rowCount / 20);

            // notices = notices.slice((page - 1) * numberOfRowsInPage, page * numberOfRowsInPage);

            for (var i = 0; i < notices.length; i++) {
                notices[i]['CreatedAt'] = format(notices[i]['CreatedAt']);
            }

            res.render('index', {
                title: '한양대학교 산업융학학부 15학번'
                , user: req.user
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