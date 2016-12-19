var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    console.log('bambooforest');
    res.render('bambooforest', { title: '대나무 숲' });
});

module.exports = router;