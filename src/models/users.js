const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userAccessInfoSchema = mongoose.Schema({
  email: { type: String, index: true, unique: true, required: true },
  password: { type: String, required: true },
  username: { type: String, required: true }
});

userAccessInfoSchema.plugin(uniqueValidator);

module.exports = mongoose.model('userAccessInfo', userAccessInfoSchema);
