var mongoose    = require('mongoose'),
bcrypt          = require('bcryptjs'),
uniqueValidator = require('mongoose-unique-validator'),
shortId         = require('shortid');
var jwt = require('jsonwebtoken')
var config          = require('../config/main');
mongoose.Promise = global.Promise;

var EstudianteSchema = mongoose.Schema({
  _id: {
    type: String,
    unique: true,
    'default': shortId.generate
  },
  clave: {
    type: String,
    require: true
  },
  correo: {
    type: String
  },
  nombres: {
    type: String
  },
  apellidos: {
    type: String
  },
  carrera: {
    type: String
  },
  puntaje: {
    type:Number
  },
  badge: {
    type:String,
    enum: ['novato','pro','experto','indestructible','duro_de_matar','rapidos_y_furiosos']
  },
    _ejercicios: [{
      ejercicio: {type: String, ref: 'Ejercicio'},
      resuelto: Boolean,
      fecha_resuelto: {type: Date, 'default': Date.now},
      puntaje: Number
  }],
    desafios: [{
      _desafio: {type: String, ref: 'Desafio'},
      fecha_iniciado: {type: Date, 'default': Date.now},
      fecha_resuelto: {type: Date},
      ganador: {type: Boolean},
      insignia: {type: String, enum: ['bronce','plata','oro']},
      ejercicios: [{
        _ejercicio: {type: String, ref: 'Ejercicio'},
        fecha_iniciado: {type: Date},
        tiempo_resuelto: {type: Date},
      }]
    }]
},{ versionKey: false, timestamps: true, collection: 'estudiantes'})

EstudianteSchema.methods.generarJwt = function() {
  var expiracion = new Date();
  expiracion.setDate(expiracion.getDate() + 5);
  return jwt.sign({
    id: this._id,
    correo: this.correo,
    nombres: this.nombres,
    apellidos: this.apellidos,
    exp: parseInt(expiracion.getTime() / 1000),
  }, config.secret );// process.env.JWT_SECRET
};

EstudianteSchema.statics.getPorCorreo = function(correo, cb) {
  this.model('Estudiante').findOne({correo: correo}, cb)
}

EstudianteSchema.methods.create = function(cb) {
  this.save(cb);
}

EstudianteSchema.statics.getById = function(id, cb) {
  this.model('Estudiante').findOne({_id: id}, cb)
}

EstudianteSchema.statics.comparePass = function(clave, hash, cb){
	// bcrypt.compare(clave, hash, function(err, isMatch) {
  //   	if(err) throw err;
  //   	cb(null, isMatch);
	// });
  if(clave == hash) {
    cb(null, true);
    return;
  } else {
    cb(null, false)
    // throw err;
    return
  }
}


module.exports = mongoose.model('Estudiante', EstudianteSchema)
