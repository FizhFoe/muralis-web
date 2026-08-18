const express = require('express')
const router = express.Router()
const controller = require('../controllers/categories.controller')
const upload = require('../config/upload.config.js')

router.get('/', controller.findAll)
router.get('/:id', controller.findOne)
router.post('/', upload.single('imagem_capa'), controller.create)
router.put('/:id/imagem', upload.single('imagem_capa'), controller.uploadImagem)

module.exports = router