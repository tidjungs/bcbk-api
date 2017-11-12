const express = require('express');
const router = express.Router();
const moment = require('moment');
const _ = require('lodash');
const Session = require('./model');
const isLoggedIn = require('../middleware').isLoggedIn;

router.post('/', isLoggedIn, function(req, res) {
  Session.create({
    name: req.body.name,
    speaker: req.body.speaker.split(','),
    start: moment(req.body.start),
    end: moment(req.body.end),
    room: req.body.room
  },
  function (err, session) {
    if (err) return res.status(500).send("There was a problem adding the session to the database.");
    res.status(200).send(session);
  });
});

router.get('/', function(req, res) {
  Session.find({}, function (err, sessions) {
    sessions = _.sortBy(sessions, ['start', 'room']);    
    if (err) return res.status(500).send("There was a problem to finding the sessions.");
    res.status(200).send(sessions);
  });
});

router.get('/:id', function(req, res) {
  Session.findById(req.params.id, function (err, session) {
    if (err) return res.status(500).send("There was a problem to finding a session.");
    res.status(200).send(session);
  });
});

router.delete('/:id', isLoggedIn, function (req, res) {
  console.log(req.params.id)
  Session.findByIdAndRemove(req.params.id, function(err, session) {
    if (err) return res.status(500).send("There was a problem to delete a session.");
    res.status(200).send(session);
  });
});

module.exports = router;