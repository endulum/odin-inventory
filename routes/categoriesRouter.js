const express = require('express')
const categoryController = require('../controllers/categoryController')

const categoriesRouter = express.Router()

categoriesRouter.get('/', categoryController.getAllCategories)
categoriesRouter.get('/:id', categoryController.getCategoryById)

module.exports = categoriesRouter