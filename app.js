var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var cors = require('cors');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var BearerStrategy = require('passport-http-bearer').Strategy;
var CustomStrategy = require('passport-custom');
var UsersController = require('./controllers/users');
let usersController = new UsersController();
var OAuth2 = require('./controllers/oauth2');
let oauth2 = new OAuth2();

passport.use('token', new CustomStrategy(
  function(req, done) {
    oauth2.authenticate(req.query.accessToken).then(() => {
      req.query.accessToken = null;
      done(null, {id: '234'});
    }).catch(err => {
      done(err, false);
    });
  }
));

passport.use(new BearerStrategy(
  function(authorization, done) {
    oauth2.authorize(authorization).then(() => {
      done(null, {id:'123'});
    }).catch(err => {
      done(err, false);
    });
  }
));

passport.use(new LocalStrategy(
  function(username, password, done) {
    usersController.login(username, password).then(user => {
      done(null, user);
    }).catch(err => {
      done(err, false);
    });
  }
));

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  usersController.findOneById(id).then(user => {
    cb(null, user);
  }).catch(err => {
    cb(err);
  });
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
