var express = require('express');
const passport = require('passport');
var Session = require('../session/model');
var router = express.Router();

router.get('/', function(req, res) {
  Session.find({}, function (err, sessions) {
    res.render('index', { sessions });
  });
});

module.exports = router;