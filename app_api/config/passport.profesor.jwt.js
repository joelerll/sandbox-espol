var JwtStrategy = require('passport-jwt').Strategy,
ExtractJwt      = require('passport-jwt').ExtractJwt,
Profesor        = require('../models/profesor'),
config          = require('../config/main');

module.exports = function(passport) {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secretOrKey: config.secret
  }
  passport.use('profesor-jwt',new JwtStrategy(opts, function(jwt_playload, done) {
    Profesor.getById(jwt_playload.id, function(err, estudiante) {
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
