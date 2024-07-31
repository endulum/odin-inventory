require('dotenv').config()

const express = require('express')
const asyncHandler = require('express-async-handler')
const logger = require('morgan')
const queries = require('./db/queries')

const app = express()
app.use(logger('dev'))

app.get('/parts', asyncHandler(async (req, res) => {
  const parts = await queries.getAllParts()
  console.log(parts)
  return res.sendStatus(200)
}))

app.get('/parts/:id', asyncHandler(async (req, res) => {
  const part = await queries.getPartById(req.params.id)
  console.log(part)
  if (!part) return res.sendStatus(404)
  return res.sendStatus(200)
}))

app.get('/categories', asyncHandler(async (req, res) => {
  const categories = await queries.getAllCategories()
  console.log(categories)
  return res.sendStatus(200)
}))

app.get('/categories/:id', asyncHandler(async (req, res) => {
  const category = await queries.getCategoryById(req.params.id)
  console.log(category)
  if (!category) return res.sendStatus(404)
  return res.sendStatus(200)
}))

app.use((err, req, res, next) => {
  console.error(err.stack)
  return res.sendStatus(err.statusCode || 500)
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`App listening on port ${port}`))
