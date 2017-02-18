var mongoose    = require('mongoose'),
bcrypt          = require('bcryptjs'),
uniqueValidator = require('mongoose-unique-validator'),
shortId         = require('shortid');

var EjercicioSchema = mongoose.Schema({
  _id: {
    type: String,
    unique: true,
    'default': shortId.generate
  },
  titulo: {
    type: String,
    required: true
  },
  descripcion: {
    type: String,
    required: true
  },
  entradas: [String],
  salidas: [String],
  etiquetas: [String],
  dificultad: {
    type: String,
    enum: ['facil','intermedio','dificil'],
    default: 'facil'
  },
  creador: {
    _id: String,
    nombres: String,
    apellidos: String,
    correo: String,
    rol: String
  }
},{collection: 'ejercicios', versionKey: false, timestamps: true})
//creador sera ingresado el documento

module.exports = mongoose.model('Ejercicio', EjercicioSchema);
