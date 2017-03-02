var passport = require('passport'),
Ejercicio    = require('../models/ejercicio'),
Ayudante     = require('../models/ayudante');

require('../config/main.js').colors;

function log(req, res,next) {
    passport.authenticate('ayudante-local', function(err, ayudante, info) {
    if( ayudante ) {
      token = ayudante.generarJwt()
      res.status(info.status).json({ success: info.success, token: 'JWT ' + token });
      return;
     } else {
       res.status(info.status).json({ success: info.success, message: info.message });
       return;
     }
    })(req, res);
}

function create(req, res, next) {
  let ayudante = new Ayudante({
    identificacion: req.body.identificacion,
    nombres: req.body.nombres,
    apellidos: req.body.apellidos,
    correo: req.body.correo,
    carrera: req.body.carrera
  })
  ayudante.create((err) => {
    if (err) {
      res.status(400).json({success: false, message: 'error al crear'})

      return;
    }
    Ayudante.getById(ayudante._id, (err, estudiante) => {
      if (err) {
        res.status(400).json({success: false, message: 'error al buscar creado'})
        return;
      }
      res.status(201).json({success: true, message: 'creado exitosamente', ayudante: ayudante})
    })
  })
}

function del (req, res ,next) {
  Ayudante.delete(req.params.id, (err) => {
    if (err) {
      console.log(`${err}`.warn);
      res.status(403).json({success: false, message: 'no se pudo borrar'})
      return;
    }
    res.status(200).json({success: true, message: 'borrado exitosamente'})
  })
}

function update(req, res, next) {
  Ayudante.update(req.params.id, req.body, (err, ayu) => {
    if (err) {
      res.status(400).json({success: false, message: 'no se pudo editar profesor'})
      return;
    }
    Ayudante.getById(req.params.id, (err, ayudante) => {
      if (err) {
        res.status(404).json({success: false, message: 'no se pudo encontrar al profesor creado'})
        return;
      }
      Ejercicio.updateEjerciciosCreador(req.params.id,ayudante, (err, res) => {
        if (err) {
            res.status(404).json({success: false, message: 'no se pudo editar al ayudante'})
            return;
        }
        console.log(res);
      })
      res.status(200).json({success: true, message: 'se pudo editar el ayudante', ayudante: ayudante})
    })
  })
}

function read(req, res, next) {
  if(req.query.like) {
    Ayudante.getAyudanteLike(req.query.like, (err, ayudantes) => {
      if(err) {
        res.status(400).json({success: false, message: 'ocurrio un error'})
        return;
      }
      res.status(200).json({success: true, message: 'obtenido el patron', ayudantes: ayudantes})
      return;
    })
  } else {
    Ayudante.getAll((err, ayudantes) => {
      if (err) {
        res.status(404).json({success: false, message: 'no se pudo obtener a los ayudantes'})
        return;
      }
      res.status(200).json({success: true, message: 'obtenido los ayudantes exitosamente', ayudantes: ayudantes})
    })
  }
}

function readOne(req, res, next) {
  Ayudante.getById(req.params.id, (err, ayudante) => {
    if (err) {
      res.status(400).json({success: false, message: 'no se pudo obtener el profesor'})
      return;
    }
    res.status(200).json({success: true, message: 'obtenido exitosamente', ayudante: ayudante})
  })
}

var bcrypt = require('bcryptjs')
function cambiarClave(req, res, next) {
  console.log(req.user);
  if (req.body.clave_nueva != req.body.clave_confirmacion) {
    res.status(200).json({success: false, message: 'no esta confirmado la clave'})
    return
  } else {
    Ayudante.getByIdCompleto(req.user._id,(err, ayudante) => {
      Ayudante.comparePass(req.body.clave, ayudante.clave, (cosa,isMatch) => {
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
              Ayudante.cambioClave(req.user._id,hash, (err) => {
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

module.exports = {
  login: log,
  cambiarClave: cambiarClave,
  //admin controll
  create: create,
  del: del,
  update: update,
  read: read,
  readOne: readOne
}
