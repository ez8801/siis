var express = require('express');
var router = express.Router();

var EZCrypto = require('./../private/scripts/EZCrypto');

/* GET home page. */
router.get('/', function(req, res, next) {
    var where = EZCrypto.decrypt(req.query.where);
    res.download(where);
});

module.exports = router;
