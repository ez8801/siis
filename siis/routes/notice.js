var express = require('express');
var router = express.Router();

var path = require('path');
var mysql = require('mysql');
var async = require('async');
var EZString = require('./../private/scripts/EZString');

// 라우트 없이 할 때에는 /test:where와 같은 형태로...
//router.get('/:id', function (req, res, next) {    
//    console.log('/:id');
//});

/* GET home page. */
router.get('/', function (req, res, next) {        
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Nmn372299!',
        database: 'hsc'
    });

    connection.query('select * from board where Idx=?', [req.query.where], function (err, results) {
        if (err) {
            throw err;
        }
        else {
            var data = results[0];
            data['CreatedAt'] = new Date(data['CreatedAt']).toFormat('YYYY.MM.DD');
            res.render('notice', data);
        }
    });
});

module.exports = router;
