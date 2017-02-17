//https://www.npmjs.com/package/bcryptjs
//https://www.npmjs.com/package/uuid
var mongoose = require('mongoose'),
xss          = require('xss'),
Estudiante     = require('../models/estudiante');


//TODO: usar bluebird o async
//TODO: mejorar nombrado de validaciones, que se entiendan
module.exports.create = function(req, res, next) {
  //TODO: sanitizar todos
  //TODO: identificacion(cedula) que sea valido
  // valicaciones
  req.body.nombres = xss(req.body.nombres);
  req.body.apellidos = xss(req.body.apellidos);
  req.body.correo = xss(req.body.correo);
  req.body.identificacion = xss(req.body.identificacion);
  req.checkBody('nombres', 'nombres esta en blanco').empty();
  req.checkBody('apellidos', 'apellidos esta en blanco').empty();
  req.checkBody('correo', 'correo esta en blanco').empty();
  req.checkBody('identificacion', 'identificacion esta en blanco').empty();
  //req.checkBody('clave', 'clave esta en blanco').empty();
  req.checkBody('correo', 'correo no valido').esCorreo();
  req.checkBody('correo', 'correo esta en mayuscula').isLower();
  //req.checkBody('clave', 'mas de cinco caracteres').isLength();
  var errors = req.validationErrors();
  if ( errors ) {
    res.status(400).json(errors);
    return
  }

  //crear nuevo objeto estudiante
  let estudiante = new Estudiante({
    correo: req.body.correo,
    clave: req.body.clave,
    identificacion: req.body.identificacion,
    nombres: req.body.nombres,
    apellidos: req.body.apellidos
  })

  estudiante.save(function(err) {
    if(err) {
      return res.status(400).json({success: false, message: 'ocurrio algun error al tratar de guardar el estudiante'});
    } else {
      Estudiante.getEstudiantes(estudiante.correo, function(err, estudiante_creado) {
        if (err) {
          res.status(400).json({success: false, message: 'Error al encontar para enviar'});
          return;
        }
          res.status(201).json({success: true, message: 'El estudiante fue creado', estudiante: estudiante_creado});
      })
    }
  })
}

module.exports.read = function(req, res, next) {
  //TODO: satinize like
  //TODO: like solo letras
  if (req.query.like) {
      var errors = req.validationErrors();
      if ( errors ) {
        res.status(400).json(errors);
        return;
      }
      Estudiante.getEstudianteLike(req.query.like, function(err , estudiante) {
        if (err) {
          res.status(404).json({success: false, message: 'ocurrio algun error al tratar de obtener el estudiante'})
          return;
        }
        res.status(200).json({success: true, message: 'estudiante encontrado', estudiante: estudiante});
        return;
      })
  }
  Estudiante.getEstudiantes(function(err, estudiantes) {
    if (err) {
      res.status(404).json({success: false, message: 'ocurrio algun error al tratar de crear estudiante'});
      return;
    }
    res.status(200).json({success: true,estudiantes: estudiantes});
  })
}

module.exports.update = function(req, res, next) {
    //TODO: no repetir == cedula, correo
    //TODO: entregar mensajes de error
    //FIXME: no permitir cambiar id, rol,
    req.body.nombres = xss(req.body.nombres);
    req.body.apellidos = xss(req.body.apellidos);
    req.body.correo = xss(req.body.correo);
    req.body.identificacion = xss(req.body.identificacion);
    req.checkBody('_id', 'no permitido cambiar id').empty();
    // req.checkBody('createdAt', 'no permitido cambiar fecha creacion').empty();
    // req.checkBody('updatedAt', 'no permitido cambiar fecha actualizacion').empty();
    // req.checkBody('tipo_identificacion', 'no permitido cambiar tipo identificacion').empty();
    // req.checkBody('rol', 'no permitido cambiar rol').empty();
    req.checkParams('_id', 'no es un id valido').isShortedId();
    var errors = req.validationErrors();
    if ( errors ) {
      res.status(400).json(errors);
      return;
    }
    Estudiante.update(req.params.id,req.body, function(err, resp) {
      if (err) return res.status(500).json( { success: false, message: err });
      Estudiante.getEstudianteById(req.params.id, function(err, estudiante) {
        if (err) {
          return res.status(404).json({success: false, message: 'error al buscar estudiante editado'})
        }
        res.status(200).json({success: true, message: 'estudiante editado', estudiante: estudiante});
      })
    })
}

module.exports.delete = function(req, res, next) {
    req.checkParams('_id', 'no es un id valido').isShortedId();
    var errors = req.validationErrors();
    if ( errors ) {
      res.status(400).json(errors);
      return;
    }
    Estudiante.delete(req.params.id, function(err, estudiante) {
      if (err) {
        res.status(403).json({success: false, message: err});
        return;
      }
      res.status(200).json({success: true, message: 'estudiante borrado'});
    })
}

module.exports.readOne = function(req, res, next) {
  req.checkParams('_id', 'no es un id valido').isShortedId();
  var errors = req.validationErrors();
  if ( errors ) {
    res.status(400).json(errors);
    return;
  }
  Estudiante.getEstudianteById(req.params.id, function(err, estudiante) {
    if (err) {
      res.status(404).json({success: false, message: 'no encontrado'});
      return;
    }
    res.status(200).json({success: true, message: 'estudiante encontrado', estudiante: estudiante});
  })
}
