const express = require('express');
const router = express.Router();
const controller = require('../controllers/artists.controller');

router.get('/', controller.findAll);
router.get('/:id', controller.findOne);
// create() -> altera user base para artista
router.post('/', controller.create);
// registerAsArtist() -> cria logo artista e utilizador
router.post('/register/', controller.registerAsArtist);
// router.put('/:id', controller.update);
// router.delete('/:id', controller.remove);

module.exports = router;