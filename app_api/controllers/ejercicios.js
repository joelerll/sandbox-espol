var mongoose = require('mongoose'),
Ejercicio    = require('../models/ejercicio');

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

function getAll(req, res, next) {
  console.log(req.headers.authorization)
  console.log(req.user)
  res.send('hello')
}

function del (req, res, next) {
  res.send('borrado')
}

function update (req, res, next) {
  res.send('elimnado')
}

function getAllOfAll (req, res, next) {
  res.send('all of all')
}

function findByTag (req, res, next) {

}

function findByCreador (req, res ,next) {

}

function findByCurso (req, res, next) {

}

function findById (req, res, next) {

}

function findByDificultad (req, res, next) {
  
}

module.exports = {
  create: create,
  getAll: getAll,
  del: del,
  update: update,
  getAllOfAll: getAllOfAll
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
