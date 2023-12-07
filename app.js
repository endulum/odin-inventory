const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const compression = require("compression");
const helmet = require("helmet");

const app = express();



const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
console.log(process.env.MONGO);
const mongoDB = process.env.MONGO;

main().catch(e => console.log(e));
async function main() { await mongoose.connect(mongoDB) }

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

const RateLimit = require("express-rate-limit");
const limiter = RateLimit({
  windowMs: 1 * 60 * 1000,
  max: 30,
});
app.use(limiter);

app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/favicon.ico', (req, res) => res.status(200));

const indexRouter = require('./routes/index');
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
