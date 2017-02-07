var mongoose = require('mongoose')
var Profesor = mongoose.model('Profesores')

//401 no autorizado
//204 no encontrado
//409 ya existe
//201 creado
// 200 ok
// 202 borrado
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
    Profesor.find({}, function(err, data) {
      if(err) {
        res.send({'error': 'error'})
      }
      res.status(200).send(data);
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
