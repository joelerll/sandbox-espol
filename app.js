var express      = require('express');
var path         = require('path');
var favicon      = require('serve-favicon');
var logger       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs     = require('express-handlebars');
//var uglify     = require('uglify-js');
var fs         = require('fs');
var session    = require('express-session');
var app        = express();
var flash = require('connect-flash');
var passport = require('passport');
var nunjucks = require('nunjucks')
require('./app_api/models/db')
require('./app_api/config/passport')

// routes
var app_admin         = require('./app/routes/admin');
var app_users         = require('./app/routes/users');
var documentacion = require('./app/routes/documentacion');
var api           = require('./app_api/routes/admin')

/*
// uglify configuracion
var appFiles = [
  'app_sandbox/app.module.js',
  'app_sandbox/app.routes.js',
  'app_sandbox/admin/admin.controller.js'
]
var uglifyApp = uglify.minify(appFiles, {
  compress: false
});
fs.writeFile('public/angular/uglify.js',
uglifyApp.code, function (err) {
  if(err) {
    console.log(err);
  } else {
    console.log("App minified con el nombre uglify.js")
  }
});*/

// view engine setup
//app.set('views', path.join(__dirname, './app/views'));
/*
app.engine('.hbs', exphbs({
        defaultLayout: 'layout',
        extname: '.hbs',
        layoutsDir:'./app/views',
        partialsDir:'./app/views/_partials'
}));*/

/*
app.set('view engine', 'twig');
app.disable('view cache');
*/
nunjucks.configure('./app/views', {
	autoescape: true,
	express: app
});
app.set('view engine', 'nunjucks');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret:'secreto', saveUninitialized: false}));

// Passport init
 app.use(passport.initialize())
// app.use(passport.session())

// flash messages
app.use(flash());

app.use(express.static(path.join(__dirname, 'public')));

// angular files static
//app.use(express.static(path.join(__dirname,'app_sandbox')))

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
