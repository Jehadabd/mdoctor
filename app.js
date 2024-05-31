var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const db=require('./modles/db')
const models=require('./modles/resh')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const doctorRouter=require('./routes/doctor')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/doctor', doctorRouter);
// catch 404 and forward to error handler
require('dotenv').config()
const port=process.env.PORT||4001
app.listen(port,()=>{
  console.log( "server is running in port  "+port)
})
module.exports = app;
