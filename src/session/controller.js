var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var moment = require('moment');
var Session = require('./model');

router.use(bodyParser.urlencoded({ extended: true }));

router.post('/', function(req, res) {
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

router.delete('/:id', function (req, res) {
  console.log(req.params.id)
  Session.findByIdAndRemove(req.params.id, function(err, session) {
    if (err) return res.status(500).send("There was a problem to delete a session.");
    res.status(200).send(session);
  });
});

module.exports = router;