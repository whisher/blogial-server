'use strict';
const express = require('express');
const router = express.Router();
const { celebrate } = require('celebrate');
const controllers = require('../controllers/users');
const validators = require('../validators/users');
const jwtVerify = require('../middleware/jwt-verify');

router.get('/account',
  jwtVerify,
  controllers.account
);

router.post('/login',
  celebrate(validators.login),
  controllers.login
);

router.post('/signup',
  celebrate(validators.signup),
  controllers.signup
);

module.exports = router;
