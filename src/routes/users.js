'use strict';
const express = require('express');
const router = express.Router();
const { celebrate } = require('celebrate');
const controllers = require('../controllers/users');
const validators = require('../validators/users');
const jwtVerify = require('../middleware/jwt-verify');
const avatar = require('../middleware/avatar');

router.post('',
  //celebrate(validators.signup),
  jwtVerify,
  avatar,
  controllers.create
);

router.put('/:id',
  jwtVerify,
  avatar,
  controllers.update
);

router.get('',
  jwtVerify,
  controllers.all
);

router.get('/:id',
  jwtVerify,
  controllers.getById
);

router.delete('/:id',
  jwtVerify,
  controllers.delete
);

router.post('/login',
  celebrate(validators.login),
  controllers.login
);

module.exports = router;
