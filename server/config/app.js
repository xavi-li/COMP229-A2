/* 
  File Name:     app.js
  Student Name:  Yuen Kwan LI
  Student ID:    301228849
  Date:          05-FEB-2023 
*/

let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let bodyParser = require('body-parser');

// modules for auth
let session = require('express-session');
let passport = require('passport');
let passportLocal = require('passport-local');
let localStrategy = passport.localStrategy;
let flash = require('connect-flash');

// database setup
let mongoose = require('mongoose');
let DB = require('./db');

// point mongoose to the DB URI
mongoose.connect(DB.URI, {useNewUrlParser: true, useUnifiedTopology: true});

let mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'Connection Error:'));
mongoDB.once('open', ()=>{
  console.log('Connected to MongoDB...');
});

let indexRouter = require('../routes/index');
//let usersRouter = require('../routes/users');
let contactsRouter = require('../routes/contact');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../node_modules')));
// mount body-parser middleware for form data
app.use(bodyParser.urlencoded({ extended: true }));

// setup express
app.use(session({
  secret:"SomeSecret", 
  saveUninitialized:false,
  resave:false
}));

// init flash to maintain the error msg
app.use(flash());

// init passport
app.use(passport.initialize());
app.use(passport.session());

// passport user config, create a user model instance
let userModel = require('../models/user');
let User = userModel.User;
passport.use(User.createStrategy());

// serialize and deserialize user info
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// mount Express Route
app.use('/', indexRouter);
//app.use('/users', usersRouter);
app.use('/contactList', contactsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
  res.status(404).render('error', {title: "Sorry, page not found"});
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', { title: 'Error'});
});


module.exports = app;
