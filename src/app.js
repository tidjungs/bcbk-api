var express = require('express');
var app = express();
require('dotenv').config();
var db = require('./db');
var SesionController = require('./session/controller');
app.use('/sessions', SesionController);

module.exports = app;
