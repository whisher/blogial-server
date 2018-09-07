'use strict';
const express = require('express');
const router = express.Router();
const controllers = require('../controllers/account');
const jwtVerify = require('../middleware/jwt-verify');

router.get('',
  jwtVerify,
  controllers.account
);

module.exports = router;
