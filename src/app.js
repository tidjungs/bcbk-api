const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');

/**
 * Environment variables
 */
require('dotenv').config();

/**
 * Passport Config
 */
require('./passport.js');

/**
 * Controllers
 */
const AdminController = require('./admin/controller');
const SesionController = require('./session/controller');
const UserController = require('./user/controller');

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
 * Connect with Controllers
 */
app.use('/', AdminController);
app.use('/sessions', SesionController);
app.use('/user', UserController)

module.exports = app;
