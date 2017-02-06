var mongoose = require('mongoose')

var ProfesorSchema = mongoose.Schema({
  correo: {Type: String},
  contrasena: {Type: String},
  rol: {Type: String},
  tipo_identificacion: {Type: String},
  identificacion: {Type: String},
  nombres: {Type: String},
  apellidos: {Type: String},
  creado: {type: Date, default: Date.now},
  editado: {type: Date, default: Date.now}
  //desafios: [{ type : ObjectId, ref: 'Desafio' }]
})

mongoose.model('Profesor', ProfesorSchema)
