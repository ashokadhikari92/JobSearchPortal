var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config()

const usersRouter = require('./routes/users');
const seekerRouter = require('./routes/seeker');
const employerRouter = require('./routes/employer');
const resumeRouter = require('./routes/resume');
const cors = require('cors');
const mongoose = require("mongoose");

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(process.env.DB_URL)
.then(() => {
    console.log("Connected to database");
})
.catch(() => {
    console.log("Connection failed.");
})


app.use('/api/users', usersRouter);
app.use('/api/seekers', seekerRouter);
app.use('/api/employers', employerRouter);

app.use('/', resumeRouter);

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
  res.json({errors: [err]});
});

app.listen(3600);
module.exports = app;
