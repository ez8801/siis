var express = require('express');
var router = express.Router();

var async = require('async');
var EZString = require('../scripts/StringEx');
var EZDB = require('../scripts/EZDB');

// 라우트 없이 할 때에는 /test:where와 같은 형태로...
//router.get('/:id', function (req, res, next) {    
//    console.log('/:id');
//});

/* GET home page. */
router.get('/', function (req, res, next) {

    async.waterfall([
        function (callback) {
            var sql = 'update board set ViewCount = ViewCount + 1 where Idx=' + req.query.where;
            EZDB.query(sql, function (err, results) {
                if (err) callback(err);
                else callback(null);
            }); 
        },
        function (callback) {
            var sql = 'select * from board where Idx=' + req.query.where;
            EZDB.query(sql, function (err, results) {
                if (err) throw err;
                else {
                    var data = results[0];
                    data['CreatedAt'] = new Date(data['CreatedAt']).toFormat('YYYY.MM.DD');
                    callback(null, data);
                }
            });
        }
    ], function (err, result) {
        if (err) throw err;
        else res.render('notice', result );
    });

    
});

module.exports = router;
