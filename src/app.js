'use strict';
const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const isProd = (process.env.NODE_ENV === 'production');

require('./db/connect')(isProd);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use('/images', express.static(path.join(process.cwd(),'assets/images')));

const users = require('./routes/users');

app.use('/users', users);

// error validation handler
app.use(function(err, req, res, next){
  res.status(400).json(err);
});

// ping
app.get('/ping', function(req, res){
  res.send('pong', 200);
});

// 404
app.get('/*', function(req, res){
  res.send(404);
});

module.exports = app;
