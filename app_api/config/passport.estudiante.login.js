var passport  = require('passport'),
LocalStrategy = require('passport-local').Strategy,
mongoose      = require('mongoose'),
Profesor      = require('../models/profesor'),
Ayudante      = require('../models/ayudante'),
Estudiante    = require('../models/estudiante');

module.exports = function( passport ) {
  passport.use('estudiante-local' ,new LocalStrategy({
    usernameField: 'correo',
    passwordField: 'clave'
  },
    function(username, password, done) {
      Estudiante.getPorCorreo(username, function(err, estudiante) {
        if ( !estudiante ) {
          return done(null, false, { status: 404, success: false, message: 'estudiante no existe' });
        }
        Estudiante.comparePass(password, estudiante.clave, function(otro, isMatch) {
          if ( isMatch ) {
            return done(null, estudiante, { status: 200, success: true, message: 'estudiante encontrado' });
          } else {
            return done(null, false, { status:401, success: false, message: 'clave incorrecta' });
          }
        })
      })
    }
  ));
}
