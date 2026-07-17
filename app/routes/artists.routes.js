const express = require('express');
const router = express.Router();
const controller = require('../controllers/artists.controller');

router.get('/', controller.findAll);
router.get('/:id', controller.findOne);
// router.post('/', controller.create);
// router.put('/:id', controller.update);
// router.delete('/:id', controller.remove);

module.exports = router;