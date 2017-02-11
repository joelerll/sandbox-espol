var mongoose = require('mongoose'),
Profesor     = require('../models/profesor');

//TODO: usar bluebird o async
//TODO: mejorar nombrado de validaciones, que se entiendan
module.exports.create = function(req, res, next) {
  //TODO: sanitizar todos
  //TODO: identificacion(cedula) que sea valido
  // valicaciones
  req.checkBody('nombres', 'nombres esta en blanco').empty();
  req.checkBody('apellidos', 'apellidos esta en blanco').empty();
  req.checkBody('correo', 'correo esta en blanco').empty();
  req.checkBody('identificacion', 'identificacion esta en blanco').empty();
  req.checkBody('clave', 'clave esta en blanco').empty();
  req.checkBody('correo', 'correo no valido').esCorreo();
  req.checkBody('correo', 'correo esta en mayuscula').isLower();
  req.checkBody('clave', 'mas de cinco caracteres').isLength();
  var errors = req.validationErrors();
  if ( errors ) {
    res.status(400).json(errors);
    return
  }

  //crear nuevo objeto profesor
  let profesor = new Profesor({
    correo: req.body.correo,
    clave: req.body.clave,
    identificacion: req.body.identificacion,
    nombres: req.body.nombres,
    apellidos: req.body.apellidos
  })

  profesor.save(function(err) {
    if(err) {
      return res.status(400).json({success: false, message: err.errors});
    } else {
      Profesor.getProfesor(profesor.correo, function(err, profesor_creado) {
        if (err) {
          res.status(400).json({success: false, message: 'Error al encontar para enviar'});
          return;
        }
          res.status(201).json({success: true, message: 'El profesor fue creado', profesor: profesor_creado});
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
      Profesor.getProfesorLike(req.query.like, function(err , profesores) {
        if (err) {
          res.status(404).json({success: false, message: 'ocurrio algun error'})
          return;
        }
        res.status(200).json({success: true, message: 'profesores encontrados', profesores: profesores});
        return;
      })
  }
  Profesor.getProfesores(function(err, profesores) {
    if (err) {
      res.status(404).json({success: false, message: 'ocurrio algun error', errores: err.errors});
      return;
    }
    res.status(200).json(profesores);
  })
}

module.exports.update = function(req, res, next) {
    //TODO: no repetir == cedula, correo
    //TODO: entregar mensajes de error
    req.checkBody('_id', 'no permitido cambiar id').notEmpty();
    req.checkBody('createdAt', 'no permitido cambiar fecha creacion').notEmpty();
    req.checkBody('updatedAt', 'no permitido cambiar fecha actualizacion').notEmpty();
    req.checkBody('tipo_identificacion', 'no permitido cambiar tipo identificacion').notEmpty();
    req.checkBody('rol', 'no permitido cambiar rol').notEmpty();
    req.checkParams('_id', 'no es un id valido').isShortedId();
    var errors = req.validationErrors();
    if ( errors ) {
      res.status(400).json(errors);
      return;
    }
    Profesor.update(req.params.id,req.body, function(err, resp) {
      if (err) return res.status(500).json( { success: false, message: err });
      Profesor.getProfesorById(req.params.id, function(err, profesor) {
        if (err) {
          return res.status(404).json({success: false, message: 'error al buscar profesor editado', errores: err.errors})
        }
        res.status(204).json({success: true, message: 'profesor editado', profesor: profesor});
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
    Profesor.delete(req.params.id, function(err, profesor) {
      if (err) {
        res.status(403).json({success: false, message: err});
        return;
      }
      res.status(204).json({success: true, message: 'profesor borrado'});
    })
}

module.exports.readOne = function(req, res, next) {
  req.checkParams('_id', 'no es un id valido').isShortedId();
  var errors = req.validationErrors();
  if ( errors ) {
    res.status(400).json(errors);
    return;
  }
  Profesor.getProfesorById(req.params.id, function(err, profesor) {
    if (err) {
      res.status(404).json({success: false, message: 'no encontrado'});
      return;
    }
    res.status(200).json({success: true, message: 'profesor encontrado', profesor: profesor});
  })
}
