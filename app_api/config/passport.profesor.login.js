var passport  = require('passport'),
LocalStrategy = require('passport-local').Strategy,
mongoose      = require('mongoose'),
Profesor      = require('../models/profesor');

module.exports = function( passport ) {
  passport.use('profesor-local' ,new LocalStrategy({
    usernameField: 'correo',
    passwordField: 'clave'
  },
    function(username, password, done) {
      Profesor.getPorCorreo(username, function(err, profesor) {
        if ( !profesor ) {
          return done(null, false, { status: 404, success: false, message: 'profesor no existe' });
        }
        Profesor.comparePass(password, profesor.clave, function(otro, isMatch) {
          if ( isMatch ) {
            return done(null, profesor, { status: 200, success: true, message: 'profesor encontrado' });
          } else {
            return done(null, false, { status:401, success: false, message: 'clave incorrecta' });
          }
        })
      })
    }
  ));
}
