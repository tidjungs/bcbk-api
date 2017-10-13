var express = require('express');
var path = require('path');
var app = express();
app.set('view engine', 'pug');
app.set("views", path.join(__dirname, "views"));
app.locals.moment = require('moment');

require('dotenv').config();
var db = require('./db');

var SesionController = require('./session/controller');
var AdminController = require('./admin/controller');
app.use('/sessions', SesionController);
app.use('/', AdminController);

module.exports = app;
