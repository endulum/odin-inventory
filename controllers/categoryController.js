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
  console.log(category)
  if (!category) return res.sendStatus(404)
  res.locals.category = category
  return res.render('layout', {
    page: 'pages/category',
    title: 'Category Details'
  })
})

module.exports = categoryController