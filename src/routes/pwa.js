'use strict';
const express = require('express');
const router = express.Router();
const controllers = require('../controllers/pwa');

router.post('/subscription',
  controllers.subscription
);

router.post('/notification',
  controllers.notification
);

module.exports = router;
