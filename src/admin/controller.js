const express = require('express');
const passport = require('passport');
const _ = require('lodash');
const isLoggedIn = require('../middleware').isLoggedIn;
const Session = require('../session/model');
const router = express.Router();

router.get('/', isLoggedIn, function(req, res) {
  Session.find({}, function (err, sessions) {
    sessions = _.sortBy(sessions, ['room', 'start']);
    res.render('index', { sessions });
  });
});

router.get('/:id', isLoggedIn, function(req, res) {
  Session.findById(req.params.id, function (err, session) {
    res.render('edit', { session })
  });
});

router.post('/:id', isLoggedIn, function(req, res) {
  Session.findById(req.params.id, function(err, session) {
    if (err) return res.send(500);
    session.name = req.body.name;
    session.speaker = req.body.speaker.split(',');
    session.save(function(err) {
      if (err) return res.send(500);
      res.redirect('/admin');
    });
  })
});

module.exports = router;
