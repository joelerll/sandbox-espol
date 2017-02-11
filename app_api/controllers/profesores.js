var mongoose = require('mongoose'),
Profesor     = require('../models/profesor');

module.exports.create = function(req, res, next) {
  //verificar si ya existe el profesores
  // enviar creado
  res.status(201).json({"res": "create"})
}

module.exports.read = function(req, res, next) {
  if (req.query.like) {
      res.json({"res": "readLike" + req.query.like})
      //buscar profesor por nombres
  } else {
    Profesor.getProfesores(function(err, profesores) {
      res.json(profesores)
    })
  }
}

module.exports.update = function(req, res, next) {
    res.json({"res":"update" + req.params.id})
    //actualizar un profesor, no olvidar cambiar la fecha de cambio y de tabla ejercicios
}

module.exports.delete = function(req, res, next) {
    res.json({"res": "delete" + req.params.id})
    // borrarun profesor y no eliminar nada de las otras tablas
}
