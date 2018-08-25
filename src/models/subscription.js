'use strict';
const mongoose = require('mongoose');

const subscriptionSchema = mongoose.Schema({
  subscriber: { type: String, required: true }
});

module.exports = mongoose.model('Subscription', subscriptionSchema);
