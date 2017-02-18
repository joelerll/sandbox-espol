var mongoose = require('mongoose'),
Ejercicio     = require('../models/ejercicio');

module.exports.create = (req, res, next) => {
  console.log(req.body)
  ejercicio = new Ejercicio ({
    titulo: req.body.titulo,
    descripcion: req.body.descripcion,
    entradas: req.body.entradas,
    salidas: req.body.salidas,
    etiquetas: req.body.etiquetas,
    dificultad: req.body.dificultad
  })
  ejercicio.save(ejercicio, (err) => {
    console.log(err)
  })
  console.log(ejercicio)
  res.json(ejercicio);
}

module.exports.read = (req, res, next) => {
  Ejercicio.find({}, (err, profesores) => {
    if (err) {
      res.json({error: 'error'})
      return;
    }
    res.json(profesores);
  })
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
