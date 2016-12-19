var express = require('express');
var router = express.Router();

var path = require('path');
const fs = require('fs');

var TEMP_DATA = null;

function replaceNewLineChars(value) {
    if (value != null && value != "")
    {
        return value.replace(/\n/g, "\n");
    }

    return value;
}

function replaceAll(val, str1, str2) {
    return val.replace(eval("/" + str1 + "/gi"), str2);
};

function ltrim(val) {
    return val.replace(/^\s*/, "");
};

function rtrim(val) {
    return val.replace(/\s*$/, "");
};

/* GET home page. */
router.get('/', function (req, res, next) {

    if (TEMP_DATA == null)
    {
        var parentDir = path.dirname(module.parent.filename);
        var finalPath = parentDir + '\\public\\files\\temp.json';

        fs.readFile(finalPath, 'utf8', function (err, data) {
            if (err) {
                console.log(err);
            }
            else {
                var str = replaceNewLineChars(data);
                str = ltrim(str);
                str = rtrim(str);
                TEMP_DATA = JSON.parse(str);

                res.render('index', { title: '한양대학교 산업융학학부 15학번', list: TEMP_DATA['notices'] });
            }
        });
    }
    else
    {
        res.render('index', { title: '한양대학교 산업융학학부 15학번', list: TEMP_DATA['notices'] });
    }

    /*
    var finalPath = parentDir + '\\public\\markdown';
    fs.readdir(finalPath, function (err, files) {
        if (err)
        {
            console.log(err);
            return;
        }
        else
        {
            res.render('index', { title: '한양대학교 산업융학학부 15학번', list: files });
        }
    });
    */

/*
var _message = '<ul>';
for (var i = 0; i < files.length; i++)
{
_message += '<li><a href="http://127.0.0.1:3000/test/';
_message += files[i];
_message += '" target="_self">' + files[i];
_message += '</a></li>';
}
_message += '</ul>'
*/

});

router.onclick = function () {
    console.log("test");
}

module.exports = router;