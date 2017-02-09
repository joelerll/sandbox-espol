var express      = require('express'),
path             = require('path'),
logger           = require('morgan'),
bodyParser       = require('body-parser'),
fs               = require('fs'),
passport         = require('passport'),
nunjucks         = require('nunjucks'),
cors             = require('cors'),
expressValidator = require('express-validator'),
app              = express();

//database
require('./app_api/models/db');

// routes
var app_admin = require('./app/routes/admin'),
app_users     = require('./app/routes/users'),
documentacion = require('./app/routes/documentacion'),
api           = require('./app_api/routes/admin');

// nunjucks
nunjucks.configure('./app/views', {
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
  }
}));
app.use(cors());
app.use(passport.initialize());
app.use(express.static(path.join(__dirname, 'public')));

// set up routes
app.use('/admin', app_admin);
app.use('/', app_users);
app.use('/api/v1', api)
app.use('/docs', documentacion);

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
