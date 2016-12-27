var express = require('express');
var router = express.Router();

var path = require('path');

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
            /*
            var where = req.params.id;
            var fileName = where.substring(0, where.length - 3);
            var filePath = parentDir + '\\public\\html\\' + fileName + '.html';
            fs.access(filePath, function (_err, _stat) {
                if (_err)
                {
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
    
    // query / body / params
    var parentDir = path.dirname(module.parent.filename);
    
    // __dirname
    var fianlPath = parentDir + '\\public\\markdown\\' + req.query.where + '.md';
    
	console.log('/: ' + req.query.where);
	console.log(typeof req.query.where);

	var arrNotice = global.TEMP_DATA['notices'];
	var find = {};
	
	for (var i = 0; i < arrNotice.length; i++) {
		var eachJSON = arrNotice[i];
		if (eachJSON['Index'] == req.query.where) {
			find = eachJSON;
			break;
		}
	}
	
    fs.readFile(fianlPath, 'utf8', function (err, data) {
        if (err) {
            console.log(err);
        }
        else {			
			find['message'] = data;

			console.log(find);
			console.log(typeof data);
            res.render('notice', find);
        }
    });
});

module.exports = router;
