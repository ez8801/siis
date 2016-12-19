var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    console.log('calendar');
    res.render('calendar');
});

module.exports = router;
