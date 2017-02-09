var passport  = require('passport'),
LocalStrategy = require('passport-local').Strategy,
mongoose      = require('mongoose'),
Admin         = require('../models/admin');

module.exports = function( passport ) {
  passport.use('admin-local' ,new LocalStrategy(
    function(username, password, done) {
      Admin.getUser(username, function(err, admin) {
        if ( !admin ) {
          return done(null, false, { status: 404, success: false, message: 'no encontrado admin' });
        }
        Admin.comparePass(password, admin.password, function(otro, isMatch) {
          if ( isMatch ) {
            return done(null, admin, { status: 200, success: true, message: 'encontrado admin' });
          } else {
            return done(null, false, { status:401, success: false, message: 'password incorrecto admin' });
          }
        })
      })
    }
  ));
}
