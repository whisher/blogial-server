/*eslint max-len: ["error", { "code": 100 }]*/
'use strict';
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  avatar: { type: String, default: null },
  created: { type: Number, default: Date.now },
  display_name: { type: String, required: true },
  email: { type: String, index: true, unique: true, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['admin', 'writer'] }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
