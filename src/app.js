'use strict';
const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const app = express();

const isProd = (process.env.NODE_ENV === 'production');

require('./db/connect')(isProd);

app.use(bodyParser.json());
app.use(errors());
app.use(cors());

app.use('/images', express.static(path.join('images')));

// Users
const users = require('./routes/users');
app.use('/api/users', users);

// Posts
const posts = require('./routes/posts');
app.use('/api/posts', posts);

// error validation handler
app.use(function(err, req, res, next){
  res.status(400).json(err);
});

// ping
app.get('/ping', function(req, res){
  res.status(200).send('pong');
});

// 404
app.get('/*', function(req, res){
  res.sendStatus(404);
});

module.exports = app;
