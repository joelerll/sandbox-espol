var xss          = require('xss');

function create(req, res, next) {
  console.log(req.body);
  req.body.nombres = xss(req.body.nombres);
  req.body.apellidos = xss(req.body.apellidos);
  req.body.correo = xss(req.body.correo);
  req.body.identificacion = xss(req.body.identificacion);
  req.body.carrera = xss(req.body.carrera);
  req.checkBody('nombres', 'nombres esta en blanco').empty();
  req.checkBody('apellidos', 'apellidos esta en blanco').empty();
  req.checkBody('correo', 'correo esta en blanco').empty();
  req.checkBody('identificacion', 'identificacion esta en blanco').empty();
  req.checkBody('identificacion', 'identificacion esta en blanco').isCedula();
  req.checkBody('carrera', 'carrera esta en blanco').empty();
  req.checkBody('correo', 'correo no valido').esCorreo();
  var errors = req.validationErrors();
  if ( errors ) {
    res.status(400).json(errors);
    return
  }
  next()
}

module.exports = {
  create: create
}
