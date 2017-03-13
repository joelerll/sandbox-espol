var mongoose = require('mongoose'),
xss          = require('xss'),
passport     = require('passport'),
jwt          = require('jsonwebtoken'),
bcrypt       = require('bcryptjs'),
Ejercicio    = require('../models/ejercicio'),
Curso = require('../models/curso'),
Profesor     = require('../models/profesor');

module.exports.login = function(req, res,next) {
    passport.authenticate('profesor-local', function(err, profesor, info) {
    if( profesor ) {
      token = profesor.generarJwt()
      res.status(info.status).json({ success: info.success, token: 'JWT ' + token });
      return;
     } else {
       res.status(info.status).json({ success: info.success, message: info.message });
       return;
     }
    })(req, res);
}

module.exports.create = function(req, res, next) {
  req.body.nombres = xss(req.body.nombres);
  req.body.apellidos = xss(req.body.apellidos);
  req.body.correo = xss(req.body.correo);
  req.body.identificacion = xss(req.body.identificacion);
  req.checkBody('nombres', 'nombres esta en blanco').empty();
  req.checkBody('apellidos', 'apellidos esta en blanco').empty();
  req.checkBody('correo', 'correo esta en blanco').empty();
  req.checkBody('identificacion', 'identificacion esta en blanco').empty();
  req.checkBody('correo', 'correo no valido').esCorreo();
  req.checkBody('correo', 'correo esta en mayuscula').isLower();
  var errors = req.validationErrors();
  if ( errors ) {
    res.status(400).json(errors);
    return
  }
  let profesor = new Profesor({
    correo: req.body.correo,
    clave: req.body.clave,
    identificacion: req.body.identificacion,
    nombres: req.body.nombres,
    apellidos: req.body.apellidos
  })
  profesor.save(function(err) {
    if(err) {
      return res.status(404).json({success: false, message: 'ocurrio algun error al tratar de guardar el profesor'});
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
  if (req.query.like) {
      var errors = req.validationErrors();
      if ( errors ) {
        res.status(400).json(errors);
        return;
      } else {
        Profesor.getProfesorLike(req.query.like, function(err , profesores) {
          if (err) {
            res.status(404).json({success: false, message: 'ocurrio algun error al tratar de obtener el profesor'})
            return;
          } else {
            res.status(200).json({success: true, message: 'profesores encontrados', profesores: profesores});
            return;
          }
        })
      }
  } else {
    Profesor.getProfesores(function(err, profesores) {
      if (err) {
        res.status(404).json({success: false, message: 'ocurrio algun error al tratar de crear profesor'});
        return;
      }
      res.status(200).json({success: true,profesores: profesores});
    })
  }
}

module.exports.update = function(req, res, next) {
    req.body.nombres = xss(req.body.nombres);
    req.body.apellidos = xss(req.body.apellidos);
    req.body.correo = xss(req.body.correo);
    req.body.identificacion = xss(req.body.identificacion);
    req.checkBody('_id', 'no permitido cambiar id').empty();
    req.checkBody('createdAt', 'no permitido cambiar fecha creacion').empty();
    req.checkBody('updatedAt', 'no permitido cambiar fecha actualizacion').empty();
    req.checkBody('tipo_identificacion', 'no permitido cambiar tipo identificacion').empty();
    req.checkBody('rol', 'no permitido cambiar rol').empty();
    req.checkParams('_id', 'no es un id valido').isShortedId();
    var errors = req.validationErrors();
    if ( errors ) {
      res.status(400).json(errors);
      return;
    }
    Profesor.update(req.params.id,req.body, function(err, resp) {
      if (err) return res.status(500).json( { success: false, message: 'Hubo un error al querer actualizar' });
      Profesor.getProfesorById(req.params.id, function(err, profesor) {
        if (err) {
          return res.status(404).json({success: false, message: 'error al buscar profesor editado'})
        }
        Ejercicio.updateEjerciciosCreador(req.params.id,profesor, (err, res) => {
          if (err) {
              res.status(404).json({success: false, message: 'no se pudo editar al ayudante'})
              return;
          }
          console.log(res);
        })
        res.status(200).json({success: true, message: 'profesor editado', profesor: profesor});
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
      res.status(200).json({success: true, message: 'profesor borrado'});
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

module.exports.cambiarClave = function (req, res, next) {
  if (req.body.clave_nueva != req.body.clave_confirmacion) {
    res.status(200).json({success: false, message: 'no esta confirmado la clave'})
    return
  } else {
    Profesor.getByIdCompleto(req.user._id,(err, ayudante) => {
      Profesor.comparePass(req.body.clave, ayudante.clave, (cosa,isMatch) => {
        if (!isMatch) {
          res.status(200).json({success: false, message: 'la clave no es valida'});
          return;
        } else {
          bcrypt.genSalt(10, function (err, salt) {
            if (err) {
              res.status(400).json({message: 'error al cambiar clave', success: false});
              return;
            }
            bcrypt.hash(req.body.clave_nueva, salt, function(err, hash) {
              if (err) {
                res.status(400).json({message: 'error al cambiar clave', success: false});
                return;
              }
              Profesor.cambioClave(req.user._id,hash, (err) => {
                if (err) {
                 res.status(400).json({message: 'error al cambiar clave', success: false});
                } else {
                  res.status(200).json({message: 'se pudo cambiar correctamente la clave', success: true});
                }
              })
            });
          });
        }
      })
    })
  }
}

module.exports.cursos = function(req, res, next) {

}

module.exports.perfil = function(req, res, next) {
	Profesor.getProfesorById(req.user.id, (err, user) => {
    if(err) {
      res.status(404).json({message: 'error al encontrar profesor', success: false})
      return;
    }
    res.status(200).json({message: 'profesor encontrado', success: true, profesor: user})
  })
}
