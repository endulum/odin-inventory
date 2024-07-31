require('dotenv').config()

const express = require('express')
const asyncHandler = require('express-async-handler')
const logger = require('morgan')
const categoriesRouter = require('./routes/categoriesRouter')
const partsRouter = require('./routes/partsRouter')

const app = express()
app.use(logger('dev'))

app.use('/categories', categoriesRouter)
app.use('/parts', partsRouter)

app.use((err, req, res, next) => {
  console.error(err.stack)
  return res.sendStatus(err.statusCode || 500)
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`App listening on port ${port}`))
