/*eslint max-len: ["error", { "code": 100 }]*/
'use strict';
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const postAccessInfoSchema = mongoose.Schema({
  author: { type: String, required: true },
  content: { type: String, required: true },
  created: { type: Date, default: Date.now },
  status: { type: String, required: true, enum: ['draft', 'published'] },
  title: { type: String, required: true },
  updated: { type: Date, default: Date.now }
});

postAccessInfoSchema.plugin(uniqueValidator);

module.exports = mongoose.model('postAccessInfo', postAccessInfoSchema);
