var express = require('express');
var router = express.Router();

const fs = require('fs');
var path = require('path');
var dateUtils = require('date-utils');

/* GET home page. */
router.get('/', function (req, res, next) {
	console.log('download');
	console.log(req.query.where);

	res.download(req.query.where);
});

router.post('/', function (req, res, next) {
	console.log('download');
	
	var params = req.body;	
	// var where = req.params.id;
	// var fileName = where.substring(0, where.length - 3);
	
	var date = new Date();
	var parentDir = path.dirname(module.parent.filename);
	var logName = date.toFormat('YYYY_MMDD_HH24MISS');
	// date.toFormat('PP_HH:MI:SS');

	var filePath = parentDir + '\\public\\html\\' + logName + '.html';
	
	// var text = converter.makeHtml(data);            
	fs.access(filePath, function(_err, _stat) {
		if (_err) {
			console.log('[ERR] ' + _err);
			
			fs.appendFile(filePath, params.content, function (__err) {
				if (__err) {
					console.log(__err);
				}

				res.location('/');
			});
			// fs.createWriteStream(filePath);
		}
		else
			console.log(_stat);
	});
});

module.exports = router;
