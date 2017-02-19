var Estudiante = require('../models/estudiante');
var passport = require('passport')

function login(req, res, next) {
  passport.authenticate('estudiante-local', function(err, estudiante, info) {
  if( estudiante ) {
    token = estudiante.generarJwt()
    res.status(info.status).json({ success: info.success, token: 'JWT ' + token });
   } else {
     res.status(info.status).json({ success: info.success, message: info.message });
   }
  })(req, res);
}

function create(req, res, next) {
  let estudiante = new Estudiante({
    nombres: req.body.nombres,
    apellidos: req.body.apellidos,
    correo: req.body.correo,
    clave: req.body.clave,
    carrera: req.body.carrera
  })
  console.log(estudiante)
  estudiante.create((err) => {
    if (err) {
      res.send('error al crear')
      return;
    }
    res.send('se creo')
    return;
  })
}

module.exports = {
  // admin control
  create: create,
  // estudiante control
  login: login,
}
