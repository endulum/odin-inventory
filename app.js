require('dotenv').config()

const express = require('express')
const logger = require('morgan')
const queries = require('./db/queries')

const app = express()
app.use(logger('dev'))

app.get('/parts', async (req, res) => {
  const parts = await queries.getAllParts()
  console.log(parts)
  return res.sendStatus(200)
})

app.get('/parts/:id', async (req, res) => {
  const part = await queries.getPartById(req.params.id)
  console.log(part)
  if (!part) return res.sendStatus(404)
  return res.sendStatus(200)
})

app.get('/categories', async (req, res) => {
  const categories = await queries.getAllCategories()
  console.log(categories)
  return res.sendStatus(200)
})

app.get('/categories/:id', async (req, res) => {
  const category = await queries.getCategoryById(req.params.id)
  console.log(category)
  if (!category) return res.sendStatus(404)
  return res.sendStatus(200)
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`App listening on port ${port}`))
