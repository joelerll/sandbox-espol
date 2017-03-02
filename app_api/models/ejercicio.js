var mongoose    = require('mongoose'),
bcrypt          = require('bcryptjs'),
uniqueValidator = require('mongoose-unique-validator'),
shortId         = require('shortid');
mongoose.Promise = global.Promise;
var Estudiante  = require('./estudiante');
var _ = require('lodash')

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

EjercicioSchema.methods.create = function(cb) {
  this.save(cb);
}

EjercicioSchema.statics.getByEtiquetaYDificultad = function(etiqueta,dificultad,id_estudiante, cb) {
  this.model('Ejercicio').find({etiquetas: etiqueta, dificultad: dificultad}, function (err, ejercicios) {
    Estudiante.getById({_id:id_estudiante}, (err2, estudiante) => {
      if (err2) {
        cb (null, err2, null)
        return
      }
      if (err) {
        cb (err, null, null)
        return
      }
      var ejercicios_temp = []
      ejercicios.forEach((ejer) => {
        estudiante._ejercicios.forEach((ejercicio_est) => {
          if (ejercicio_est.ejercicio == ejer._id) {
            ejercicios_temp.push(ejer);
            return
          }
        })
      })
      cb(null,null,_.differenceBy(ejercicios,ejercicios_temp,'_id'))
    })
  })
}

EjercicioSchema.statics.getById = function(id, cb) {
  this.model('Ejercicio').findOne({_id: id}, cb)
}

EjercicioSchema.statics.getAllEtiquetas = function(cb) {
  this.model('Ejercicio').find({},{etiquetas: 1, _id: 0},cb)
}


EjercicioSchema.statics.getAll = function(cb) {
  this.model('Ejercicio').find({}, cb);
}

EjercicioSchema.statics.getByCreador = function(id, cb) {
  this.model('Ejercicio').find({'creador._id': id}, cb);
} //SypzZFrKl

EjercicioSchema.statics.getOneByCreadorandId = function(id,id_ejercicio, cb) {
  this.model('Ejercicio').findOne({'creador._id': id, _id: id_ejercicio}, cb);
}

EjercicioSchema.statics.delete = function(id,id_profesor, cb) {
  this.model('Ejercicio').findOneAndRemove({$and:[{_id: id}, {'creador._id': id_profesor}]}).exec(cb);
}

EjercicioSchema.statics.existe = function(id,cb) {
   this.model('Ejercicio').findOne({_id: id}, function(err, ejercicio) {
     if (err || !ejercicio) {
       cb (false)
       return
     }
     cb (true)
   })
}

EjercicioSchema.statics.esCreador = function(id_ejercicio,id_creador, cb) {
   this.model('Ejercicio').findOne({_id: id_ejercicio}, function(err, ejercicio) {
     console.log(ejercicio)
     if (!ejercicio) {
       cb(false)
       return;
     }
     if (ejercicio.creador._id === id_creador) {
       cb (true)
       return;
     }
     cb (false)
   })
}

EjercicioSchema.statics.update = function(id,ejercicio_nuevo, cb ) {
  console.log(ejercicio_nuevo);
   this.model('Ejercicio').findOneAndUpdate({_id: id}, ejercicio_nuevo, {upsert:true}, cb);
}

module.exports = mongoose.model('Ejercicio', EjercicioSchema);
