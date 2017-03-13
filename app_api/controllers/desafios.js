var Desafio = require('../models/desafio')
function create(req, res, next) {
  console.log(req.body)
  let desafio = new Desafio({
    titulo: req.body.titulo,
    _ejercicios: req.body.ejercicios,
    tiempo_limite: req.body.tiempo_limite,
    _curso: req.body.curso
  })
  console.log(desafio)
  desafio.create((err, res) => {
    console.log(err)
    console.log(res)
  })
  res.status(200).json({success: true, message: 'desafio creado'})
}

module.exports = {
  create: create
}
