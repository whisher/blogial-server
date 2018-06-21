const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');


const debug = require('debug')('api:server');

const app = express();

const uri = 'mongodb+srv://ilwebdifabio:MdMxemXzx3KkSrA3@cluster0-uycvd.mongodb.net/test?retryWrites=true';
mongoose
  .connect(
    uri
  )
  .then(() => {
    debug('Connected to database!');
  })
  .catch(() => {
    debug('Connection failed!');
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

const users = require('./routes/users');

app.use('/api/users', users);

// error validation handler
app.use(function(err, req, res, next){
  res.status(400).json(err);
});

module.exports = app;
