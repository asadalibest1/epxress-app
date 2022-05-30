var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { connectDB } = require('./DB/DB.js')
var indexRouter = require('./routes/index');
var userRouter = require('./routes/user/User');
var TransactionsRouter = require('./routes/Transactions/Transactions');
var BlogsRouter = require('./routes/Blogs/Blogs');
var PasswordRouter = require('./routes/PasswordReset/PasswordReset');
const portno = process.env.PORT || 3000
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/transaction', TransactionsRouter);
app.use('/blogs', BlogsRouter);
app.use('/reset-password', PasswordRouter);

// app.use('/users', usersRouter);

// catch 404 and forward to error handler

connectDB((err, client) => {
  if (err) console.log(err);
  app.listen(portno, () => {

    console.log(`listening to port no : ${portno}`)
  })
}) 