const asyncHandler = require('express-async-handler')
const queries = require('../db/queries')

const categoryController = {}

categoryController.getAllCategories = asyncHandler(async (req, res) => {
  const categories = await queries.getAllCategories()
  return res.render('layout', {
    page: 'pages/categories',
    title: 'Browse Categories',
    categories
  })
})

categoryController.getCategoryById = asyncHandler(async (req, res) => {
  const category = await queries.getCategoryById(req.params.id)
  if (!category) return res.sendStatus(404)
  return res.render('layout', {
    page: 'pages/category',
    title: 'Category Details',
    category
  })
})

module.exports = categoryController