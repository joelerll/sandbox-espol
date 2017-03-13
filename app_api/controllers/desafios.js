var Desafio = require('../models/desafio')
function create(req, res, next) {
  let desafio = new Desafio({
    titulo: req.body.titulo,
    _ejercicios: req.body.ejercicios,
    tiempo_limite: req.body.tiempo_limite,
    _curso: req.body.curso
  })
  desafio.create((err, res) => {
    if(err) {
      res.status(404).json({success: false, message: 'error al crear desafio'})
      return
    }
    res.status(200).json({success: true, message: 'desafio creado'})
  })
}

module.exports = {
  create: create
}
