var passport = require('passport');

module.exports.login = function(req, res) {
    passport.authenticate('ayudante-local', function(err, ayudante, info) {
    if( ayudante ) {
      token = ayudante.generarJwt()
      res.status(info.status).json({ success: info.success, token: 'JWT ' + token });
     } else {
       res.status(info.status).json({ success: info.success, message: info.message });
     }
    })(req, res);
}
