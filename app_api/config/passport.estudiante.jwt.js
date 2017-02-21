var JwtStrategy = require('passport-jwt').Strategy,
ExtractJwt      = require('passport-jwt').ExtractJwt,
Ayudante           = require('../models/ayudante');
var config          = require('../config/main');
Estudiante = require('../models/estudiante')

module.exports = function(passport) {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secretOrKey: config.secret
  }
  passport.use('estudiante-jwt',new JwtStrategy(opts, function(jwt_playload, done) {

    Estudiante.getById(jwt_playload.id, function(err, estudiante) {
      if( err ) {
        return done(err, false);
      }
      if( estudiante ) {
        done(null, estudiante);
      } else {
        done (null, false);
      }
    })
  }))
}
