var Estudiante = require('../models/estudiante'),
_ = require('lodash'),
moment = require('moment'),
passport       = require('passport');

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
    identificacion: req.body.identificacion,
    nombres: req.body.nombres,
    apellidos: req.body.apellidos,
    correo: req.body.correo,
    clave: req.body.clave,
    carrera: req.body.carrera
  })
  console.log(estudiante)
  estudiante.create((err) => {
    console.log('ni fa')
    if (err) {
      res.status(400).json({success: false, message: 'hubo un error al momento de crear'})
      return;
    }
    Estudiante.getById(estudiante.id, (err, estudiante) => {
      if (err) {
        res.status(400).json({success: false, message: 'error al tratar de encontrar el estudiante creado'})
        return;
      }
      res.status(201).json({success: true, message: 'se creo correctamente el estudiante', estudiante: estudiante})
    })
  })
}

function getAll (req, res, next) {
  if (req.query.like) {
    Estudiante.getEstudianteLike(req.query.like,(err, estudiantes) => {
      if (err) {
        res.status(400).json({message: 'hubo un error', success: false})
      } else {
        res.status(200).json({success: true, estudiantes: estudiantes})
      }
    })
  } else {
    Estudiante.getAll((err, estudiantes) => {
      if (err) {
        res.status(400).json({success: false, message: 'no se pudo obtener todos los estudiantes'})
        return;
      }
      res.status(200).json({success: true, message: 'encontrados los estudiantes', estudiantes: estudiantes})
    })
  }
}

function update (req, res, next) {
  let estudiante = new Estudiante({
    identificacion: req.body.identificacion,
    nombres: req.body.nombres,
    apellidos: req.body.identificacion,
    correo: req.body.correo,
    clave: req.body.clave,
    carrera: req.body.carrera
  })
  estudiante.update(req.params.id,(err, estudiante) => {
    if (err) {
      res.status(400).json({success: false, message: 'ocurrio un error al tratar de crear'})
      return;
    }
    Estudiante.getById(req.params.id, (err, estudiante) => {
      if (err) {
        res.json({success: false, message: 'error al encontrar editado'})
        return;
      }
      if (!estudiante) {
        res.json({success: false, message: 'estudiante no existe'})
        return
      }
      res.status(200).json({success: true, message: 'estudiante correctamente editado', estudiante: estudiante})
    })
  })
}

function updateClave (req, res, next) {
  Estudiante.updateClave(req.params.id, req.body.clave, (err, match) =>{
    if (err) {
      res.send('error')
      return
    }
    res.send('clave cambiada')
  })
}

function del (req, res, next) {
  Estudiante.delete(req.params.id, (err) => {
    if (err) {
      res.json({success: false, message: 'no se pudo eliminar el estudiante'})
      return;
    }
    res.json({success: true, message: 'eliminado correctamente'})
  })
}

function registrarEjercicio(carpeta,archivo,ejercicio,user) {
  Estudiante.registrarEjercicio(user,ejercicio,archivo,carpeta, (err, res) => {
    if (err) {
      console.log(err)
      return false;
    }
    Estudiante.puntajeYBadge(user);
    insigniasUltimas(user._id)
    return true
  })
}

function insigniasUltimas(id_user) {
  Estudiante.getByIdPopulate(id_user,(err, estudiante) => {
    if (err) {
      res.send(error);
      return;
    }
    var fechas = []
    //sacar fechas
    estudiante._ejercicios.forEach((ejercicio) => {
      var fecha = moment(ejercicio.fecha_resuelto).format('YYYY-MM-DD')
      if (ejercicio.resuelto) {
        fechas.push(fecha);
      }
    })
    //ordenar fechas por si acaso
    var dias_ordenado = fechas.sort(function(a,b) {
      var f1 = a.split('-')
      var f2 = b.split('-')
      return moment(new Date(f1[0],f1[1],f1[2])).isSameOrAfter(new Date(f2[0],f2[1],f2[2]))
    });
    var cont = 0
    var f1 = ''
    var f2 = ''
    var j = 0
    var x = 0
    var insignia = ''
    for (var i = 0; i < dias_ordenado.length; i++) {
      dias_ordenado[i]
      if (i - 4 >= 0){
        j = i - 4
        f1 = dias_ordenado[j].split('-')
        f2 = dias_ordenado[i].split('-')
        // console.log(new Date(2016,1,20).toISOString());
        // console.log(moment(new Date(2016,1,20).toISOString()).format('YYYY-MM-DD'));
        x = moment(new Date(f2[0],f2[1],f2[2])).diff(new Date(f1[0],f1[1],f1[2]));
        if (x/604800 <= 1) {
          if (insignia != 'duro_de_matar' && insignia != 'rapidos_y_furiosos') {
            insignia = 'indestructible'
          }
        }
      }
      if (i - 9 >= 0) {
        j = i - 9
        f1 = dias_ordenado[j].split('-')
        f2 = dias_ordenado[i].split('-')
        x = moment(new Date(f2[0],f2[1],f2[2])).diff(new Date(f1[0],f1[1],f1[2]));
        if (x/604800) {
          if (insignia != 'rapidos_y_furiosos') {
            insignia = 'duro_de_matar'
          }
        }
      }
      if (i - 14 >= 0) {
        j = i - 14
        f1 = dias_ordenado[j].split('-')
        f2 = dias_ordenado[i].split('-')
        x = moment(new Date(f2[0],f2[1],f2[2])).diff(new Date(f1[0],f1[1],f1[2]));
        if (x/604800) {
          insignia = 'rapidos_y_furiosos'
        }
      }
    }
    Estudiante.insignia(id_user,insignia, (err) => {
      if (err) {
        console.log('error');
        return
      }
      console.log('no error');
      return
    })
  })
}

function registrarEjercicioMal(carpeta,archivo,ejercicio,user) {
  Estudiante.registrarEjercicioMal(user,ejercicio,archivo,carpeta, (err, res) => {
    if (err) {
      console.log(err)
      return false;
    }
    Estudiante.puntajeYBadge(user);
    insigniasUltimas(user._id)
    return true
  })
}

function perfil (req, res, next) {
  Estudiante.getById(req.user._id, (err, estudiante) => {
    if (err) {
      res.status(400).json({'message': 'user no encontrado', success: false})
      return
    }
    Estudiante.puntajeYBadge(estudiante);
    res.status(200).json({message: 'user encontrado', estudiante: estudiante, success: true})
  })
}
var bcrypt = require('bcryptjs')
function cambiarClave(req, res, next) {
  if (req.body.clave_nueva != req.body.clave_confirmacion) {
    res.status(200).json({success: false, message: 'no esta confirmado la clave'})
    return
  }
  Estudiante.getById(req.user._id,(err, estudiante) => {
    Estudiante.comparePass(req.body.clave, estudiante.clave, (cosa,isMatch) => {
      if (!isMatch) {
        res.status(200).json({success: false, message: 'la clave no es valida'})
        return;
      }
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
          Estudiante.cambioClave(req.user._id,hash, (err) => {
            if (err) {
              res.status(400).json({message: 'error al cambiar clave', success: false});
            } else {
              res.status(200).json({message: 'se pudo cambiar correctamente la clave', success: true});
            }
          })
        });
      });
    })
  })
}

module.exports = {
  // admin control
  create: create,
  getAll: getAll,
  update: update,
  del: del,
  // estudiante control
  insigniasUltimas: insigniasUltimas,
  perfil: perfil,
  login: login,
  updateClave: updateClave,
  registrarEjercicio: registrarEjercicio,
  registrarEjercicioMal: registrarEjercicioMal,
  cambiarClave: cambiarClave
}
