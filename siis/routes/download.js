var express = require('express');
var router = express.Router();

var async = require('async');
var EZDB = require('./../scripts/EZDB');
var EZCrypto = require('./../scripts/EZCrypto');

/* GET home page. */
router.get('/', function (req, res, next) {
    //if (req.user == null || req.user == undefined)
    //{
    //    res.render('/login');
    //    return;
    //}
    
    var Idx = req.query.where;
    async.waterfall([
        function (callback) {
            var sql = 'update dataroom set DownloadCount = DownloadCount + 1 where Idx=' + Idx;
            EZDB.query(sql, function (err, results) {
                if (err) callback(err);
                else callback(null);
            });
        }
        , function (callback) {
            var sql = 'select HashValue from dataroom where Idx = ' + Idx;
            EZDB.query(sql, function (err, results) {
                if (err) callback(err);
                else callback(null, results);
            });
        }
    ], function (err, results) {
        if (err) throw err;
        else {
            var where = EZCrypto.decrypt(results[0]['HashValue']);
            res.download(where);
        }
    });
    
    // var where = EZCrypto.decrypt(req.query.where);
    // res.download(where);
});

module.exports = router;
