var Estudiante = require('../models/estudiante'),
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
  Estudiante.getAll((err, estudiantes) => {
    if (err) {
      res.status(400).json({success: false, message: 'no se pudo obtener todos los estudiantes'})
      return;
    }
    res.status(200).json({success: true, message: 'encontrados los estudiantes', estudiantes: estudiantes})
  })
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

function saveEstudiantesArray(array) {
  var estudiantes = []
  var messages = []
  array.forEach((estudiante) => {
    if (estudiante[0] == 'identificacion') {
      return
    }
    let estudiante_nuevo = new Estudiante({
      identificacion: estudiante[0],
      nombres: estudiante[1],
      apellidos: estudiante[2],
      correo: estudiante[3],
      carrera: estudiante[4]
    })
    let error = {
      mesaje: 'ok',
      id: estudiante_nuevo._id
    }
    estudiante_nuevo.create((err) => {
      if (err) {
        console.log('error')
      }
    })
    estudiantes.push(estudiante_nuevo)
    messages.push(error)
  })
  return {success: true, estudiantes: estudiantes, messages: messages}
}

function registrarEjercicio(carpeta,archivo,ejercicio,user) {
  Estudiante.registrarEjercicio(user,ejercicio,archivo,carpeta, (err, res) => {
    if (err) {
      console.log(err)
      return false;
    }
    Estudiante.puntajeYBadge(user);
    return true
  })
}

function perfil (req, res, next) {
  Estudiante.getById(req.user._id, (err, estudiante) => {
    if (err) {
      res.status(400).json({'message': 'user no encontrado', success: false})
      return
    }
    res.status(200).json({message: 'user encontrado', estudiante: estudiante, success: true})
  })
}

module.exports = {
  // admin control
  create: create,
  getAll: getAll,
  update: update,
  del: del,
  saveEstudiantesArray: saveEstudiantesArray,
  // estudiante control
  perfil: perfil,
  login: login,
  updateClave: updateClave,
  registrarEjercicio: registrarEjercicio
}
