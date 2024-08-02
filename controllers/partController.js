const asyncHandler = require('express-async-handler')
const queries = require('../db/queries')

const partController = {}

partController.searchParts = asyncHandler(async (req, res) => {
  const parts = await queries.getParts(
    Object.keys(req.query).length > 0 && req.query
  )
  const categories = await queries.getAllCategories()
  res.locals.parts = parts
  res.locals.categories = categories
  res.locals.query = req.query
  return res.render('layout', {
    page: 'pages/parts-search',
    title: 'Search Parts'
  })
})

partController.getPartById = asyncHandler(async (req, res) => {
  const part = await queries.getPartById(req.params.id)
  console.log(part)
  if (!part) return res.sendStatus(404)
  return res.sendStatus(200)
})

module.exports = partController