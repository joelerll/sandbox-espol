var JwtStrategy = require('passport-jwt').Strategy,
ExtractJwt      = require('passport-jwt').ExtractJwt,
Ayudante           = require('../models/ayudante');
var config          = require('../config/main');

module.exports = function(passport) {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secretOrKey: config.secret
  }
  passport.use('ayudante-jwt',new JwtStrategy(opts, function(jwt_playload, done) {
    Ayudante.getById(jwt_playload.id, function(err, ayudante) {
      if( err ) {
        return done(err, false);
      }
      if( ayudante ) {
        done(null, ayudante);
      } else {
        done (null, false);
      }
    })
  }))
}
