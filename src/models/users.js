/*eslint max-len: ["error", { "code": 100 }]*/
'use strict';
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userAccessInfoSchema = mongoose.Schema({
  city: { type: String },
  company_name: { type: String },
  company_city: { type: String },
  company_website: { type: String },
  email: { type: String, index: true, unique: true, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['admin', 'company', 'freelancer', 'pm'] },
  username: { type: String, required: true }
});

userAccessInfoSchema.plugin(uniqueValidator);

module.exports = mongoose.model('userAccessInfo', userAccessInfoSchema);
