'use strict';
const mongoose = require('mongoose');

const subscriptionSchema = mongoose.Schema({
  subscriber: { type: String, required: true },
  time: { type: Number, default: Date.now }
});

module.exports = mongoose.model('Subscription', subscriptionSchema);
