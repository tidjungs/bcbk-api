const express = require('express');
const passport = require('passport');
const isLoggedIn = require('../middleware').isLoggedIn;
const Session = require('../session/model');
const router = express.Router();

router.get('/', isLoggedIn, function(req, res) {
  Session.find({}, function (err, sessions) {
    res.render('index', { sessions });
  });
});

module.exports = router;