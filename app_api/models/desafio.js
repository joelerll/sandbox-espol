var mongoose = require('mongoose');
var shortId = require('shortid')
mongoose.Promise = global.Promise;

var DesafioSchema = mongoose.Schema({
  _id: {
    type: String,
    unique: true,
    'defult': shortId.generate
  },
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
  }

},{collection: 'desafios', timestamps: true, versionKey: false})

exports.module = mongoose.model('Desafio', DesafioSchema)
