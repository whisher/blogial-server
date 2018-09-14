/*eslint max-len: ["error", { "code": 100 }]*/
'use strict';
const mongoose = require('mongoose');
const debug = require('debug')('api:server');

const options = {
  useNewUrlParser: true,
  autoIndex: false, // Don't build indexes
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0,
  connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4 // Use IPv4, skip trying IPv6
};
const connection = (isProd) => {
  const db = isProd ? 'production1' : 'development26';
  const uri = `mongodb+srv://ilwebdifabio:MdMxemXzx3KkSrA3@cluster0-uycvd.mongodb.net/${db}`;
  mongoose
    .connect(
      uri,
      options
    )
    .then(() => {
      debug('Connected to database!');
    })
    .catch(() => {
      debug('Connection failed!');
    });
};

module.exports = connection;
