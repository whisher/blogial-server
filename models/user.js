const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  password: { type: String, required: true},
  email: { type: String, required: true },
  role: { type: String, required: true, enum: ['admin', 'freelancer', 'company', 'project-manager'] }
});


module.exports = mongoose.model('User', userSchema);
