var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
var uuidV4 = require('uuid/v4');
//https://www.npmjs.com/package/bcryptjs
module.exports = function isAuthenticated(req, res, next) {
  if ( req.session.authenticated ) {
    res.status(200).json({'mensaje': 'autorizado'})
  } else {
    res.status(401).json({'mensaje': 'no autorizado'})
  }
  /*
  if (req.body.nombre == 'Jhon') {
    var hash = bcrypt.hashSync(req.body.nombre, salt);
    console.log('autenticado ' + hash)
    console.log(uuidV4())
    req.session.authenticated = true;
    next()
  } else {
    res.redirect('/')
  }*/
}
