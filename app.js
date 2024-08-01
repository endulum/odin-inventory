require('dotenv').config()

const path = require('path')
const express = require('express')
const logger = require('morgan')
const categoriesRouter = require('./routes/categoriesRouter')
const partsRouter = require('./routes/partsRouter')

const app = express()
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(logger('dev'))
app.use(express.static(path.join(__dirname, "public")))

app.get('/', (req, res) => {
  return res.render('layout', {
    page: 'pages/index',
    title: 'Index'
  })
})

app.use('/categories', categoriesRouter)
app.use('/parts', partsRouter)

app.use((err, req, res, next) => {
  console.error(err.stack)
  return res.sendStatus(err.statusCode || 500)
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`App listening on port ${port}`))
