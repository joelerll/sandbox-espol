var passport = require('passport'),
Admin        = require('../models/admin');

module.exports.login = function(req, res) {
  req.checkBody("username", "user esta en blanco").empty();
  req.checkBody("password", "pass esta en blanco").empty();
  var errors = req.validationErrors();
  if ( errors ) {
    res.status(400).send(errors);
    return;
  } else {
    passport.authenticate('admin-local', function(err, admin, info) {
    if( admin ) {
      token = admin.generarJwt()
      res.status(info.status).json({ success: info.success, token: 'JWT ' + token });
     } else {
       res.status(info.status).json({ success: info.success, message: info.message });
     }
    })(req, res);
  }
}

module.exports.dashboard = function(req, res) {
  res.json({ success: true, message: 'dashboard' });
}

//borrar solo prueba
module.exports.create = function(req, res) {
  var admin = new Admin({
    username: req.body.username,
    password: req.body.password
  })
  console.log(admin)
  admin.savee(admin, function(err, admin) {
    if (err) {
      console.log('no guardado')
      res.send(err)
    } else {
      console.log('guardado')
      console.log(admin)
      res.send(admin)
    }
  })
}
