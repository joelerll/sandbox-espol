var passport  = require('passport'),
LocalStrategy = require('passport-local').Strategy,
mongoose      = require('mongoose'),
Profesor      = require('../models/profesor'),
Ayudante      = require('../models/ayudante'),
Estudiante    = require('../models/estudiante');

module.exports = function( passport ) {
  passport.use('ayudante-local' ,new LocalStrategy({
    usernameField: 'correo',
    passwordField: 'clave'
  },
    function(username, password, done) {
      Ayudante.getPorCorreo(username, function(err, ayudante) {
        if ( !ayudante ) {
          return done(null, false, { status: 404, success: false, message: 'ayudante no existe' });
        }
        Ayudante.comparePass(password, ayudante.clave, function(otro, isMatch) {
          if ( isMatch ) {
            return done(null, ayudante, { status: 200, success: true, message: 'ayudante encontrado' });
          } else {
            return done(null, false, { status:401, success: false, message: 'clave incorrecta' });
          }
        })
      })
    }
  ));
}
