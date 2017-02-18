var mongoose    = require('mongoose'),
bcrypt          = require('bcryptjs'),
uniqueValidator = require('mongoose-unique-validator'),
shortId         = require('shortid');

var EstudianteSchema = mongoose.Schema({
  _id: {
    type: String,
    unique: true,
    'default': shortId.generate
  },
  nombres: {
    type: String
  },
  apellidos: {
    type: String
  },
  _ejercicios: [{type: String, ref: 'Ejercicio'}]
})

module.exports = mongoose.model('Estudiante', EstudianteSchema)
