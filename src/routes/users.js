'use strict';
const express = require('express');
const router = express.Router();
const validate = require('express-validation');

const controllers = require('../controllers/users');
const validators = require('../validators/users');
const jwtVerify = require('../middleware/jwt-verify');

router.get('/account',
  jwtVerify,
  controllers.account
);

router.post('/login',
  validate(validators.login),
  controllers.login
);

router.post('/signup',
  validate(validators.signup),
  controllers.signup
);

module.exports = router;