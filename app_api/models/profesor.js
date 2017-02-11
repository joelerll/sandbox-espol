var mongoose = require('mongoose');

var ProfesoresSchema = mongoose.Schema({
  correo:              {type: String},
  clave:               {type: String},
  rol:                 {type: String},
  tipo_identificacion: {type: String},
  identificacion:      {type: String},
  nombres:             {type: String},
  apellidos:           {type: String},
  creado:              {type: Date, default: Date.now},
  editado:             {type: Date, default: Date.now}
},{collection: 'profesores', versionKey: false})  //desafios: [{ type : ObjectId, ref: 'Desafio' }]

ProfesoresSchema.statics.getProfesores= function(cb) {
  return this.model('Profesor').find({},cb);
}

module.exports = mongoose.model('Profesor', ProfesoresSchema)
