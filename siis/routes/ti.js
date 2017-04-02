var express = require('express');
var router = express.Router();

var EZDB = require('./../scripts/EZDB');
var Config = require('../scripts/Config');

function format(val) {
    var date = new Date(val);
    return date.toFormat('YYYY.MM.DD');
};

function comma(str) {
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
};

/* GET users listing. */
router.get('/', function (req, res, next) {

    var sql = 'select TransactionTime, Description, WithdrawalAmount, DepositedAmount, Balance from accountbook order by Idx desc limit 1000';
    EZDB.query(sql, function (err, results) {
        if (err) throw err;
        else {

            for (var i = 0; i < results.length; i++) {
                results[i]['TransactionTime']
                    = format(results[i]['TransactionTime']);

                results[i]['WithdrawalAmount']
                    = comma(results[i]['WithdrawalAmount']);
                results[i]['DepositedAmount']
                    = comma(results[i]['DepositedAmount']);
                results[i]['Balance']
                    = comma(results[i]['Balance']);
            }

            res.render('ti', {
                title: '한양대학교 산업융학학부 15학번'
                , user: req.user
                , list: results
            });
        }
    });
});

module.exports = router;
