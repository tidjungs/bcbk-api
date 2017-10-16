const express = require('express');
const passport = require('passport');
const _ = require('lodash');
const isLoggedIn = require('../middleware').isLoggedIn;
const Session = require('../session/model');
const router = express.Router();

router.get('/', isLoggedIn, function(req, res) {
  Session.find({}, function (err, sessions) {
    sessions = _.sortBy(sessions, ['start', 'room']);
    res.render('index', { sessions });
  });
});

router.get('/:id', isLoggedIn, function(req, res) {
  Session.findById(req.params.id, function (err, session) {
    res.render('edit', { session })
  });
});

module.exports = router;
