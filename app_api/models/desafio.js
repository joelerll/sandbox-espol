var mongoose = require('mongoose'),
shortId      = require('shortid');

mongoose.Promise = global.Promise;

var DesafioSchema = mongoose.Schema({
  _id: {
    type: String,
    unique: true,
    'default': shortId.generate
  },
  _curso: {type: String, ref: 'Curso'},
  titulo: {
    type: String
  },
  tiempo_limite: {
    type: Date,
    required: true
  },
  creador: {type: String, ref: 'Profesor'},
  insignia: {
    type: String,
    enum: ['bronce','plata','oro'],
  },
  _ejercicios: [{type: String, ref: 'Ejercicio'}],
},{collection: 'desafios', timestamps: true, versionKey: false})

DesafioSchema.methods.create = function(cb) {
  this.save(cb);
}

module.exports = mongoose.model('Desafio', DesafioSchema)
