var express = require('express');
var router = express.Router();

var path = require('path');
var dateUtils = require('date-utils');

var EZDB = require('./../scripts/EZDB');

function GetUserName(user) {
    var username = '';
    if (user.provider == 'kakao') {
        username = user.username;
    } else if (user.provider == 'facebook') {
        username = user.displayName;
    }
    return username;
}

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.render('write', {
        username: GetUserName(req.user)
    });
});

router.post('/', function (req, res, next) {

    var params = req.body;    
    var date = new Date();
    var dateName = date.toFormat('YYYY-MM-DD');

    var sql = 'INSERT INTO board set Author=?, Title=?, Contents=?, CreatedAt=?, UpdatedAt=?';
    EZDB.query(sql
        , [params.author
        , params.title
        , params.content
        , dateName
        , dateName]
        , function (err, results) {
        if (err) throw err;
        else {
            res.redirect('/');
        }
    });
    
    // var fileName = where.substring(0, where.length - 3);
    
    /*
    var date = new Date();
    var logName = date.toFormat('YYYY_MMDD_HH24MISS');
    // date.toFormat('PP_HH:MI:SS');

    var parentDir = path.dirname(module.parent.filename);
    var filePath = parentDir + '\\public\\html\\' + logName + '.html';

    fs.access(filePath, function (_err, _stat) {
        if (_err) {
            console.log('[ERR] ' + _err);

            fs.appendFile(filePath, params.content, function (__err) {
                if (__err) {
                    console.log(__err);
                }
				
                // location
                res.redirect('/');
            });
            // fs.createWriteStream(filePath);
        }
        else
            console.log(_stat);
    });
    */
});

module.exports = router;
