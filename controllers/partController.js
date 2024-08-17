const asyncHandler = require('express-async-handler')
const queries = require('../db/queries')

const partController = {}

partController.searchParts = asyncHandler(async (req, res) => {
  console.log(req.query)
  const parts = await queries.getParts(
    Object.keys(req.query).length > 0 && req.query
  )
  const categories = await queries.getAllCategories()
  res.locals.query = req.query
  return res.render('layout', {
    page: 'pages/parts',
    title: 'Browse Parts',
    parts,
    categoryDropdown: {
      list: await queries.getAllCategories(),
      includeAny: true
    }
  })
})

partController.getPartById = asyncHandler(async (req, res) => {
  const part = await queries.getPartById(req.params.id)
  res.locals.part = part
  return res.render('layout', {
    page: 'pages/part',
    title: `Part Details`
  })
})

module.exports = partController