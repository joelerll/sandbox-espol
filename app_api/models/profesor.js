var mongoose = require('mongoose');

var ProfesorSchema = mongoose.Schema({
  correo:              {type: String},
  clave:               {type: String},
  rol:                 {type: String},
  tipo_identificacion: {type: String},
  identificacion:      {type: String},
  nombres:             {type: String},
  apellidos:           {type: String},
  creado:              {type: Date, default: Date.now},
  editado:             {type: Date, default: Date.now}
})  //desafios: [{ type : ObjectId, ref: 'Desafio' }]

module.exports = mongoose.model('Profesores', ProfesorSchema)
