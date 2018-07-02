var Joi = require('joi');

exports.signup = {
  body: {
    email: Joi.string().email().required(),
    firstname: Joi.string().required(),
    password: Joi.string().required(),
    lastname: Joi.string().required(),
    role: Joi.string().required(),
    username: Joi.string().required()
  }
};

exports.login = {
  body: {
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }
};
