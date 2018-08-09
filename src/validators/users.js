'use strict';
const Joi = require('joi');

exports.signup = {
  body: {
    display_name: Joi.string().required(),
    email: Joi.string().email().required(),
    firstname: Joi.string().required(),
    password: Joi.string().required(),
    lastname: Joi.string().required(),
    role: Joi.string().required()
  }
};

exports.login = {
  body: {
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }
};
