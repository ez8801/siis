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

const numberOfRowsInPage = 20;

/* GET home page. */
router.get('/', function (req, res, next) {    
    var page = 1;
    page = req.query.page;
    if (page == undefined) {
        console.log('page was undefined');
        page = 1;
    }

    console.log('/, ' + page);

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
				
                var notices = global.TEMP_DATA['notices'];
                var numberOfPages = Math.ceil(notices.length / 20);
                notices = notices.slice((page - 1) * numberOfRowsInPage, page * numberOfRowsInPage);

                console.log(numberOfPages);
                res.render('index'
                    , {
                        title: '한양대학교 산업융학학부 15학번'
                        , list: notices
                        , page: page
                        , numberOfPages: numberOfPages
                    });
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