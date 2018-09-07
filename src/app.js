'use strict';
const bodyParser = require('body-parser');
const cors = require('cors');
const { errors } = require('celebrate');
const express = require('express');
const helmet = require('helmet');
const path = require('path');
const webpush = require('web-push');

// Notification
const config = require('./config/config');
webpush.setVapidDetails('mailto:' + config.vapidEmail,
  config.vapidPublicKey,
  config.vapidPrivateKey);

// Db
const isProd = (process.env.NODE_ENV === 'production');
require('./db/connect')(isProd);

// Express
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet());
app.use(cors());
app.use(errors());
// heroku to get https protocol
app.enable('trust proxy');
app.use('/images', express.static(path.join('images')));

// Users
const users = require('./routes/users');
app.use('/api/users', users);

// Account
const account = require('./routes/account');
app.use('/api/account', account);

// Posts
const posts = require('./routes/posts');
app.use('/api/posts', posts);

// Pwa
const pwa = require('./routes/pwa');
app.use('/pwa', pwa);

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
