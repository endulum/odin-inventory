const asyncHandler = require('express-async-handler')
const queries = require('../db/queries')

const categoryController = {}

categoryController.getAllCategories = asyncHandler(async (req, res) => {
  const categories = await queries.getAllCategories()
  console.log(categories)
  return res.sendStatus(200)
})

categoryController.getCategoryById = asyncHandler(async (req, res) => {
  const category = await queries.getCategoryById(req.params.id)
  console.log(category)
  if (!category) return res.sendStatus(404)
  return res.sendStatus(200)
})

module.exports = categoryController