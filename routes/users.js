const express = require('express');
const router = express.Router();
const validate = require('express-validation');

const controllers = require('../controllers/users');
const validators = require('../validators/users');

router.get('/', controllers.find);
router.post('/', validate(validators.save), controllers.save);
router.get('/:id', controllers.findById);
router.put('/:id', controllers.update);
router.delete('/:id', controllers.delete);

module.exports = router;
