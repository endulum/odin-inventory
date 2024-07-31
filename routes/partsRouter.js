const express = require('express')
const partController = require('../controllers/partController')

const partsRouter = express.Router()

partsRouter.get('/', partController.getAllParts)
partsRouter.get('/:id', partController.getPartById)

module.exports = partsRouter