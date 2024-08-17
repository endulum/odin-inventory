const express = require('express')
const asyncHandler = require('express-async-handler')

const indexRouter = express.Router()

indexRouter.get('/', asyncHandler(async (req, res) => {
  return res.render('layout', {
    page: 'pages/index',
    title: 'Welcome'
  })
}))

module.exports = indexRouter