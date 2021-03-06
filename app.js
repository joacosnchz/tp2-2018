var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var cors = require('cors');
var debug = require('debug')('trello:app');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var BearerStrategy = require('passport-http-bearer').Strategy;
var CustomStrategy = require('passport-custom');
var OAuth2 = require('./controllers/oauth2');
let oauth2 = new OAuth2();
var UsersController = require('./controllers/users');
let usersController = new UsersController();

passport.use(new LocalStrategy(
  {
    session: false
  },
  function(username, password, done) {
    usersController.login(username, password).then(user => {
      done(null, user);
    }).catch(err => {
      debug(err);
      done({
        message: err,
        status: 401
      }, false);
    });
  }
));

passport.use(new BearerStrategy(
  function(authorization, done) {
    usersController.findOneById(authorization).then(user => {
      done(null, user);
    }).catch(err => {
      debug(err);
      done({
        message: err,
        status: 401
      }, false);
    });
  }
));

passport.use('token', new CustomStrategy(
  function(req, done) {
    oauth2.authenticate(req.query.accessToken).then(user => {
      req.query.accessToken = null;
      done(null, user);
    }).catch(err => {
      debug(err);
      done({
        message: err,
        status: 401
      }, false);
    });
  }
));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(user, cb) {
  cb(null, user);
});

var router = require('./routes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect('mongodb://127.0.0.1:27017/trello', { 
  useNewUrlParser: true 
});

app.use(cors());

app.use('/', router);

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
