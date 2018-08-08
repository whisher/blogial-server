/*eslint max-len: ["error", { "code": 100 }]*/
'use strict';
const mongoose = require('mongoose');
const debug = require('debug')('api:server');

const connection = (isProd) => {
  const db = isProd ? 'production' : 'development9';
  const uri = `mongodb+srv://ilwebdifabio:MdMxemXzx3KkSrA3@cluster0-uycvd.mongodb.net/${db}`;
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
};

module.exports = connection;
