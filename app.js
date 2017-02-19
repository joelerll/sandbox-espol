var express      = require('express'),
path             = require('path'),
logger           = require('morgan'),
bodyParser       = require('body-parser'),
fs               = require('fs'),
passport         = require('passport'),
nunjucks         = require('nunjucks'),
cors             = require('cors'),
expressValidator = require('express-validator'),
app              = express(),
validator        = require('validator'),
shortid          = require('shortid');

//database
require('./app_api/models/db');

// routes
admin_api          = require('./app_api/routes/admin');
ayudante_api = require('./app_api/routes/ayudantes');
estudiante_api = require('./app_api/routes/estudiantes');
// nunjucks
nunjucks.configure('./errors/views', {
	autoescape: true,
	express: app
});
app.set('view engine', 'nunjucks');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  },
  customValidators: {
    esCorreo: function(value) {
        return validator.isEmail(value);
    },
    isLower: function(value) {
      return validator.isLowercase(value);
    },
    isLength: function(value) {
      return validator.isLength(value, {min:5, max: undefined});
    },
    empty: function(value) {
      return !validator.isLength(value, {min:0, max: 0});
    },
    notEmpty: function(value) {
      return !validator.isLength(value, {min:1, max: undefined});
    },
    isShortedId: function(value) {
      return !shortid.isValid(value);
    }
 }
}));
app.use(cors());
app.use(passport.initialize());
app.use(express.static(path.join(__dirname, 'public')));

// set up routes
app.use('/', express.static(path.join(__dirname + "/apps_angular")));
app.use('/api/v1/admin', admin_api);
app.use('/api/v1/ayudantes', ayudante_api);
app.use('/api/v1/estudiantes', estudiante_api);
// app.use('/api/v1/estudiante', estudiante_api);
// app.user('/api/v1/ayudante', ayudante_api);
app.use('/docs', express.static(path.join(__dirname + "/public/documentacion")));
app.use('/profesores', express.static(path.join(__dirname + "/apps_angular/users/profesores")));
app.use('/ayudantes', express.static(path.join(__dirname + "/apps_angular/users/ayudantes")));
app.use('/estudiantes', express.static(path.join(__dirname + "/apps_angular/users/estudiantes")));
app.use('/admin', express.static(path.join(__dirname + "/apps_angular/admin/")));
app.use('/adminv', express.static(path.join(__dirname + "/apps_vue/admin/")));

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
  res.render('./errors/error');
});

module.exports = app;
