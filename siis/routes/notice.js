var express = require('express');
var router = express.Router();

// var markdownit = require('markdown-it');
// var md = new markdownit();
// var escapeHtml = require('escape-html');

var marked = require('marked');
var showdown = require('showdown');
var converter = new showdown.Converter();

var index = require('./index');

var path = require('path');
const fs = require('fs');

// 라우트 없이 할 때에는 /test:where와 같은 형태로...
router.get('/:id', function (req, res, next) {
    
    console.log('/:id');

    // query / body / params
    var parentDir = path.dirname(module.parent.filename);

    // __dirname
    var fianlPath = parentDir + '\\public\\markdown\\' + req.params.id + '.md';
    
    fs.readFile(fianlPath, 'utf8', function (err, data) {
        if (err)
        {
            console.log(err);
        }
        else
        {
            // var text = marked(data);

            /*
            var where = req.params.id;
            var fileName = where.substring(0, where.length - 3);
            var filePath = parentDir + '\\public\\html\\' + fileName + '.html';

            // var text = converter.makeHtml(data);            
            fs.access(filePath, function (_err, _stat) {
                if (_err)
                {
                    console.log('[ERR] ' + _err);

                    fs.appendFile(filePath, text);

                    // fs.createWriteStream(filePath);
                }
                else
                    console.log(_stat);
            });
            */

            res.render('notice', { message: data });
        }
    });
});

/* GET home page. */
router.get('/', function (req, res, next) {    
    if (index.TEMP_DATA)
    {
        console.log('got cha!');
    }

    // query / body / params
    var parentDir = path.dirname(module.parent.filename);
    
    // __dirname
    var fianlPath = parentDir + '\\public\\markdown\\' + req.query.where + '.md';
    
    console.log('/');

    fs.readFile(fianlPath, 'utf8', function (err, data) {
        if (err) {
            console.log(err);
        }
        else {
            // var text = marked(data);
            res.render('notice', { message: data });
        }
    });
});

module.exports = router;
