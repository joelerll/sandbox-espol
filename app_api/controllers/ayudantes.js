var passport = require('passport');
var Ayudante = require('../models/ayudante')

function login(req, res) {
    passport.authenticate('ayudante-local', function(err, ayudante, info) {
    if( ayudante ) {
      token = ayudante.generarJwt()
      res.status(info.status).json({ success: info.success, token: 'JWT ' + token });
     } else {
       res.status(info.status).json({ success: info.success, message: info.message });
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
  console.log(ayudante)
  ayudante.create((err) => {
    console.log(err)
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
      res.status(403).json({success: false, message: 'no se pudo borrar'})
      return;
    }
    res.status(200).json({success: true, message: 'borrado exitosamente'})
  })
}

function update(req, res, next) {
  res.send('update')
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

//find by curso

module.exports = {
  login: login,
  //admin controll
  create: create,
  del: del,
  update: update,
  read: read,
  readOne: readOne
}
