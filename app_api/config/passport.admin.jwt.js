var JwtStrategy = require('passport-jwt').Strategy,
ExtractJwt      = require('passport-jwt').ExtractJwt,
Admin           = require('../models/admin'),
config          = require('../config/main');

module.exports = function(passport) {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secretOrKey: config.secret
  }
  passport.use('admin-jwt',new JwtStrategy(opts, function(jwt_playload, done) {
    Admin.getUserById(jwt_playload.id, function(err, admin) {
      if( err ) {
        return done(err, false);
      }
      if( admin ) {
        done(null, admin);
      } else {
        done (null, false);
      }
    })
  }))
}
