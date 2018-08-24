'use strict';
const express = require('express');
const router = express.Router();
// const { celebrate } = require('celebrate');
const controllers = require('../controllers/posts');
// const validators = require('../validators/posts');
const jwtVerify = require('../middleware/jwt-verify');
const extractFile = require('../middleware/image');
const extractGallery = require('../middleware/gallery');

router.post('',
  // celebrate(validators.create),
  jwtVerify,
  extractFile,
  controllers.create
);

router.post('/gallery',
  jwtVerify,
  extractGallery,
  controllers.gallery
);

router.get('',
  controllers.all
);

router.get('/:id',
  jwtVerify,
  controllers.getById
);

router.put('/:id',
  jwtVerify,
  extractFile,
  controllers.update
);

router.delete('/:id',
  jwtVerify,
  controllers.delete
);

module.exports = router;
