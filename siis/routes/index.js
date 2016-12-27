var express = require('express');
var router = express.Router();

var path = require('path');

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

    if (global.TEMP_DATA == null)
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
				global.TEMP_DATA = JSON.parse(str);
				
                res.render('index', { title: '한양대학교 산업융학학부 15학번', list: global.TEMP_DATA['notices'] });
            }
        });
    }
    else
    {
        res.render('index', { title: '한양대학교 산업융학학부 15학번', list: global.TEMP_DATA['notices'] });
    }

    /*
    var finalPath = parentDir + '\\public\\markdown';
    fs.readdir(finalPath, function (err, files) {
		res.render('index', { title: '한양대학교 산업융학학부 15학번', list: files });
    });
    */
});

router.onclick = function () {
    console.log("test");
}

module.exports = router;