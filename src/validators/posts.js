'use strict';
const { Joi } = require('celebrate');

exports.create = {
  body: {
    content: Joi.string().required(),
    title: Joi.string().required()
  }
};
