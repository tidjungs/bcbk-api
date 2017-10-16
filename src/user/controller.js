const express = require('express');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt-nodejs');
const passport = require('passport');
const User = require('./model');
const router = express.Router();

router.get('/login', function(req, res) {
  if (req.isAuthenticated()) { return res.redirect('/') }
  // const errMessage = req.flash('error');
  res.render('login', {
    //  errMessage: errMessage.length > 0 ? errMessage[0] : null
  });
});

router.post('/login',   
  passport.authenticate('local', {
    successRedirect: '/admin',
    failureRedirect: '/user/login',
    failureFlash: true
  })
);

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/user/login');
});

// router.post('/register', function(req, res) {
//   User.create({
//     username: req.body.username,
//     password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8), null)
//   }, function(err, user) {
//     if (err) res.status(500).send("error register");
//     res.status(200).send("success");
//   })
// });

module.exports = router;
