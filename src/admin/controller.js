var express = require('express');
var bodyParser = require('body-parser');
var Session = require('../session/model');
var router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', function(req, res) {
  Session.find({}, function (err, sessions) {
    res.render('index', { sessions })    
  });
});

module.exports = router;