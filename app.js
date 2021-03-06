var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var engine = require('ejs-mate');
var session = require('express-session');

// router
var root = require('./routes/root');
var auth = require('./routes/auth');
var action = require('./routes/action');

var app = express();

// set express-session
app.use(session({
  secret: 'marcus822',
  resave: false,
  saveUninitialized: true
}));

// view engine setup
// use ejs-locals for all ejs templates: 
app.engine('ejs', engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// every request need login
app.use(function(req, res, next) {
  if (req.session.userProfile || req.originalUrl === '/login' || req.path.startsWith('/auth')) {
    next();
  }
  else {
    res.redirect('/login');
  }
});

app.use('/', root);
app.use('/auth', auth);
app.use('/action', action);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
