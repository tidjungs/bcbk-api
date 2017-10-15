const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');
var cookieParser = require('cookie-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
require('dotenv').config();
const User = require('./user/model');

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false);
      }
      if (!user.validPassword(password)) {
        return done(null, false);
      }
      return done(null, user);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  console.log('id:' + id)
  User.findById(id, function (err, user) {
    if (err) { return done(err); }
    done(null, user);
  });
});

/**
 * Connect to MongoDB
 */
mongoose.connect(process.env.DB_URL);

/**
 * Create Express server and configuration
 */
const app = express();
app.set('view engine', 'pug');
app.set("views", path.join(__dirname, "views"));
app.locals.moment = require('moment');
app.use(cookieParser());
app.use(flash());
app.use(session({
  secret: process.env.SECRET_KEY,
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Controllers
 */
const AdminController = require('./admin/controller');
const SesionController = require('./session/controller');
const UserController = require('./user/controller');


/**
 * Connect with Controllers
 */
app.use('/', AdminController);
app.use('/sessions', SesionController);
app.use('/user', UserController)

module.exports = app;
