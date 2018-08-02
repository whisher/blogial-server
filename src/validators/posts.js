'use strict';
const Joi = require('joi');

exports.create = {
  body: {
    author: Joi.string().required(),
    content: Joi.string().required(),
    title: Joi.string().required()
  }
};
