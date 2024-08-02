const express = require('express')
const partController = require('../controllers/partController')

const partsRouter = express.Router()

partsRouter.get('/', partController.searchParts)
partsRouter.get('/:id', partController.getPartById)

module.exports = partsRouter