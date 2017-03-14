var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('bambooforest', { title: '대나무 숲', user: req.user });
});

module.exports = router;