'use strict';
const Joi = require('joi');

exports.create = {
  body: {
    content: Joi.string().required(),
    title: Joi.string().required()
  }
};
