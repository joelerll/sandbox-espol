var mongoose    = require('mongoose'),
bcrypt          = require('bcryptjs'),
uniqueValidator = require('mongoose-unique-validator'),
shortId         = require('shortid'),
jwt             = require('jsonwebtoken'),
config          = require('../config/main'),
mail            = require('../config/mail.js'),
uniqueValidator = require('mongoose-unique-validator');

mongoose.Promise = global.Promise;

var EstudianteSchema = mongoose.Schema({
  _id: {
    type: String,
    unique: true,
    'default': shortId.generate
  },
  identificacion: {
    type: String,
    unique: true
  },
  clave: {
    type: String,
    require: true
  },
  correo: {
    type: String,
    unique: true
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
    type:Number,
    default: 0
  },
  badge: {
    type:String,
    enum: ['novato','pro','experto']
  },
  insignia: {
    type: String,
    enum: ['indestructible','duro_de_matar','rapidos_y_furiosos']
  },
    _ejercicios: [{
      ejercicio: {type: String, ref: 'Ejercicio', unique: true},
      resuelto: Boolean,
      fecha_resuelto: {type: Date, 'default': Date.now},
      puntaje: Number,
      archivo: {
        nombre: {type: String},
        path: {type: String}
      },
      _id: {id: false}
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

EstudianteSchema.plugin(uniqueValidator);

EstudianteSchema.pre('update', function(next) {
  console.log('editado')
  next()
})

EstudianteSchema.statics.registrarEjercicio = function(user,ejercicio,nombre_archivo,path_archivo,cb) {
  let ejercicio_nuevo = {
    ejercicio: ejercicio._id,
    resuelto:true,
    archivo: {
      nombre: nombre_archivo,
      path: path_archivo
    },
     _id: ''
  }
  console.log(ejercicio_nuevo)
  this.model('Estudiante').update({_id: user._id},{$addToSet: {'_ejercicios': ejercicio_nuevo}},{safe: true, upsert: true},cb )
}

EstudianteSchema.statics.registrarEjercicioMal = function(user,ejercicio,nombre_archivo,path_archivo,cb) {
  let ejercicio_nuevo = {
    ejercicio: ejercicio._id,
    resuelto:false,
    archivo: {
      nombre: nombre_archivo,
      path: path_archivo
    },
     _id: ''
  }
  console.log(ejercicio_nuevo)
  this.model('Estudiante').update({_id: user._id},{$addToSet: {'_ejercicios': ejercicio_nuevo}},{safe: true, upsert: true},cb )
}

EstudianteSchema.statics.puntajeYBadge = function(user) {
  this.model('Estudiante').findOne({_id: user._id}).populate({path: ' _ejercicios.ejercicio'}).exec((err, data) => {
    data.puntaje = 0;
    data.badge = ''
    let puntaje = data.puntaje;
    let ejercicios_validos = []
    let cont = 0
    data._ejercicios.forEach((ejercicio)=> {
      if (ejercicio.ejercicio) {
        if (ejercicio.ejercicio.dificultad == 'facil' && ejercicio.resuelto) {
          puntaje = puntaje + 5
          cont = cont + 1
        } else if (ejercicio.ejercicio.dificultad == 'intermedio' && ejercicio.resuelto) {
          puntaje = puntaje + 10
          cont = cont + 1
        } else if (ejercicio.ejercicio.dificultad == 'dificil' && ejercicio.resuelto) {
          puntaje = puntaje + 15
          cont = cont + 1
        }
      }
    })
    var badge = ''
    if (cont >= 10) {
      badge = 'novato'
    }
    if (cont >= 20) {
      badge = 'pro'
    }
    if (cont >= 30) {
      badge = 'experto'
    }
    this.model('Estudiante').update({_id: user._id},{$set: {puntaje: puntaje, badge: badge}}, (err) => {
    })
  })
}

EstudianteSchema.statics.insignia = function(id_user,insignia,cb) {
    this.model('Estudiante').findOne({_id: id_user}).populate({path: ' _ejercicios.ejercicio'}).exec((err, data) => {
      this.model('Estudiante').update({_id: id_user},{$set: {insignia: insignia}}, cb)
    })
}

EstudianteSchema.pre('save',function (next) {
  const estudiante = this;
  this.model('Estudiante').findOne({$or: [{identificacion: estudiante.identificacion}, {correo: estudiante.correo}]}).exec((err, estu) => {
    if (estu) {
      console.log('existe' + estudiante.correo)
    }
  })
  if (this.isNew) {
    let clave = shortId.generate()
    estudiante.clave = clave;
    estudiante.clave = '1'
    console.log('clave estudiante ' + estudiante.clave)
    error = mail.enviar(this.correo,estudiante.clave);
    if (error) {
      next(new Error('error al enviar mail'));
    }
  }
  if (this.isModified('clave') || this.isNew) {
    console.log('modificado clave')
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        return next(err);
      }
      bcrypt.hash(estudiante.clave, salt, function(err, hash) {
        if (err) {
          return next(err);
        }
        estudiante.clave = hash;
        return next();
      });
    });
  } else {
     return next();
  }
});

EstudianteSchema.statics.cambioClave = function(id_estudiante, nueva_clave_hash, cb) {
  this.model('Estudiante').findOneAndUpdate({_id:id_estudiante}, {$set: {clave: nueva_clave_hash}}, cb)
}


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

EstudianteSchema.statics.getByIdPopulate = function(id, cb) {
  this.model('Estudiante').findOne({_id: id},{'_ejercicios': 1}).populate({path: '_ejercicios.ejercicio', select: '-updatedAt -createdAt -desafios -clave'}).exec(cb)
}

EstudianteSchema.statics.getAll = function(cb) {
  this.model('Estudiante').find({}, cb);
}
EstudianteSchema.statics.getAllDetails = function(cb) {
  this.model('Estudiante').find({},{'_ejercicios.fecha_resuelto': 1, '_id': 0}).populate({path: ' _ejercicios.ejercicio'}).exec(cb)
}


EstudianteSchema.methods.update = function(id,cb) {
  let estudiante = this
  console.log(estudiante)
  this.model('Estudiante').update({ _id: id }, { $set: { nombres: estudiante.nombres, apellidos: estudiante.apellidos, correo: estudiante.correo, carrera: estudiante.carrera, identificacion: estudiante.identificacion }}, cb);
}

EstudianteSchema.statics.updateClave = function(id, clave, cb) {
  this.model('Estudiante').findOne({_id: id}, function(err, estudiante) {
    if(err) {
      cb(error,false);
      return;
    }
    bcrypt.compare(clave, estudiante.clave, function(err, isMatch) {
      	if(err) return cb(err,false);
        if (isMatch) {
          cb(false,false)
          return;
        } else {
          bcrypt.genSalt(10, function (err, salt) {
            if (err) {
              cb(err,false);
              return;
            }
            bcrypt.hash(clave, salt, function(err, hash) {
              if (err) {
                cb(err,false);
                return;
              }
              console.log('calve ' + hash)
              cb(false, true)
              // this.model('Estudiante').update({_id:id},{$set: {clave: hash}},cb)
            });
          });
        }
  	});
  })
}

EstudianteSchema.statics.delete = function(id, cb) {
  this.model('Estudiante').findByIdAndRemove(id).exec(cb)
}

EstudianteSchema.statics.comparePass = function(password, hash, cb){
	bcrypt.compare(password, hash, function(err, isMatch) {
    	if(err) throw err;
    	cb(null, isMatch);
	});
}

EstudianteSchema.statics.getEstudianteLike = function(query, cb) {
  this.model('Estudiante').find({$or: [{nombres:  {'$regex': query, '$options': 'i' }}, {apellidos: {'$regex': query, '$options': 'i' }}]}, cb);
}

module.exports = mongoose.model('Estudiante', EstudianteSchema)
