var Joi = require('joi');

exports.save = {
  body: {
    firstname: Joi.string().regex(/[a-zA-Z0-9]{3,30}/).required(),
    lastname: Joi.string().regex(/[a-zA-Z0-9]{3,30}/).required(),
    email: Joi.string().email().required(),
  }
};
