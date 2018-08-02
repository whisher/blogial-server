'use strict';
const express = require('express');
const router = express.Router();
const validate = require('express-validation');

const controllers = require('../controllers/posts');
const validators = require('../validators/posts');
const jwtVerify = require('../middleware/jwt-verify');

router.post('',
  validate(validators.create),
  jwtVerify,
  controllers.create
);

router.get('',
  jwtVerify,
  controllers.all
);

router.get('/:id',
  jwtVerify,
  controllers.getById
);

router.put('/:id',
  jwtVerify,
  controllers.update
);

module.exports = router;
