const express = require('express');
const router = express.Router();
const controller = require('../controllers/users.controller');

router.get('/', controller.findAll);
router.get('/:id', controller.findOne);
router.post('/', controller.create);

module.exports = router;