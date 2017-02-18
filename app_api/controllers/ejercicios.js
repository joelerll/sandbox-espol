var mongoose = require('mongoose'),
Ejercicio    = require('../models/ejercicio');

// CREATE
function create(req, res, next) {
    ejercicio = new Ejercicio ({
      titulo: req.body.titulo,
      descripcion: req.body.descripcion,
      entradas: req.body.entradas,
      salidas: req.body.salidas,
      etiquetas: req.body.etiquetas,
      dificultad: req.body.dificultad,
      creador: {
        _id: req.user._id,
        nombres: req.user.nombres,
        apellidos: req.user.apellidos,
        correo: req.user.correo,
        rol: req.user.rol
      }
    })
    ejercicio.save(ejercicio)
}

// READ
function getAllOfAll (req, res, next) {
  Ejercicio.getAll((err, ejercicios_todos) => {
    if (err) {
      res.send('erro');
      return;
    }
    res.json({ejercicios: ejercicios_todos, sucess: true})
  })
}

function getAllMisEjercicios (req, res ,next) {
  Ejercicio.getByCreador(req.user._id,(err, ejercicios_profesor) => {
    if (err) {
      res.send('hay un error');
      return;
    }
    res.json({ejercicios: ejercicios_profesor, sucess: true});
  })
}

// UPDATE
function update (req, res, next) {
  //res.send(req.body)
  Ejercicio.update(req.params.id,req.body, (err, ejercicio) => {
    if (err) {
      res.send('error')
      return;
    }
    res.send(ejercicio)
  })
}

// DELETE
function esCreador(req, res, next) {
  Ejercicio.esCreador(req.params.id, req.user._id, (esCreador) => {
    if (esCreador) {
      next();
      return;
    }
    res.send('no es creador')
  })
}

function del (req, res, next) {
  Ejercicio.delete(req.params.id, req.user._id, (err) => {
    if (err) {
      res.send('hubo algun error');
      return;
    }
    res.send('fue eliminado');
  })
}


function allByCurso (req, res, next) {

}

function oneById (req, res, next) {

}

function allByDificultad (req, res, next) {

}

module.exports = {
  create: create,
  getAllMisEjercicios: getAllMisEjercicios,
  del: del,
  update: update,
  getAllOfAll: getAllOfAll,
  esCreador: esCreador
}



//TODO: buscar por tag
//TODO: buscar por profesor
//TODO: buscar por ayudante
//TODO: buscar por curso
//TODO: update
//TODO: delete
//TODO: edit
//TODO: read all
//TODO: read one
//TODO:
//TODO:
