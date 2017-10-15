const express = require('express');
const LocalStrategy = require('passport-local').Strategy;
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const passport = require('passport');
const User = require('./model');
const router = express.Router();

router.get('/login', function(req, res) {
  console.log(req.isAuthenticated())
  if (req.isAuthenticated()) { return res.redirect('/') }
  res.render('login');
});

router.post('/login',   
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/user/login',
  })
);

router.post('/register', function(req, res) {
  User.create({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8), null)
  }, function(err, user) {
    if (err) res.status(500).send("error register");
    res.status(200).send("success");
  })
});

module.exports = router;
