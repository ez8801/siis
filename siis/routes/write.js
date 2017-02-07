var express = require('express');
var router = express.Router();

var path = require('path');
var dateUtils = require('date-utils');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.render('write');
});

router.post('/', function (req, res, next) {

    console.log(req.body);
    var params = req.body;
    console.log('Title: ' + params.title);
    console.log('Content: ' + params.content);
    res.redirect('/');

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
