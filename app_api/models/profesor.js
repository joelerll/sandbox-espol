var mongoose    = require('mongoose'),
bcrypt          = require('bcryptjs'),
uniqueValidator = require('mongoose-unique-validator'),
config          = require('../config/main')
jwt             = require('jsonwebtoken'),
shortId         = require('shortid'),
mail            = require('../config/mail.js');

var ProfesorSchema = mongoose.Schema({
  _id: {
	    type: String,
	    unique: true,
	    'default': shortId.generate
	},
  correo:              {
    type: String,
    validate: {
      validator: function(v) {
            return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v);
      },
      message: '{VALUE} no es un correo'
    },
    required: [true, 'correo es requerido'],
    unique: [true]
  },
  clave:               {
    type: String,
    required: [true, 'clave es requerida'],
    default: 'clave prueba'
  },
  rol:                 {
    type: String,
    enum: ['profesor'],
    default: 'profesor',
    required: [true, 'rol es requerido']
  },
  tipo_identificacion: {
    type: String,
    enum: ['cedula'],
      default: 'cedula',
    required: [true, 'tipo identificacion es requerido']
  },
  //TODO: regex profesore cedula
  identificacion:      {
    type: String,
    required: [true, 'identificacion es requerida'],
    unique: true
  },
  nombres:             {
    type: String,
    required: [true, 'nombres son requeridos']
  },
  apellidos:           {
    type: String,
    required: [true, 'apellidos son requeridos']
  },
  _desafios:[{
    type: String,
    ref: 'Desafio'
  }]
},{collection: 'profesores', versionKey: false, timestamps: true})  //desafios: [{ type : ObjectId, ref: 'Desafio' }]

ProfesorSchema.plugin(uniqueValidator);

ProfesorSchema.pre('save', function (next) {
  const profesor = this;
  if (this.isNew) {
    let clave = shortId.generate()
    profesor.clave = clave;
    console.log('clave profesor ' + profesor.clave)
    error = mail.enviar(this.correo,profesor.clave);
    if (error) {
      next(new Error('error al enviar mail'));
    }
  }
  if (this.isModified('clave') || this.isNew) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        return next(err);
      }
      bcrypt.hash(profesor.clave, salt, function(err, hash) {
        if (err) {
          return next(err);
        }
        profesor.clave = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

ProfesorSchema.methods.generarJwt = function() {
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

ProfesorSchema.statics.getPorCorreo = function(correo, cb) {
  this.model('Profesor').findOne({correo: correo}, cb)
}

ProfesorSchema.statics.getByIdCompleto = function(id, cb) {
  this.model('Profesor').findOne({ _id:  id }, cb);
}


ProfesorSchema.statics.getById = function(id, cb) {
  this.model('Profesor').findOne({ _id:  id },{clave: 0}, cb);
}

ProfesorSchema.statics.cambioClave = function(id_profesor, nueva_clave_hash, cb) {
  this.model('Profesor').findOneAndUpdate({_id:id_profesor}, {$set: {clave: nueva_clave_hash}}, cb)
}

ProfesorSchema.statics.comparePass = function(password, hash, cb){
	bcrypt.compare(password, hash, function(err, isMatch) {
    	if(err) {
        console.log('error');
        cb(null,false)
      }
    	cb(null, isMatch);
	});
}



ProfesorSchema.methods.create = function(cb) {
  this.save(cb);
}

ProfesorSchema.statics.update = function(id,admin_nuevo, cb ) {
   this.model('Profesor').findOneAndUpdate({_id: id}, admin_nuevo, {upsert:true}, cb);
}

ProfesorSchema.statics.getProfesor = function(correo, cb) {
  this.model('Profesor').findOne({correo: correo},{clave: 0}, cb);
}

ProfesorSchema.statics.getProfesorById = function(id, cb) {
  this.model('Profesor').findOne({_id: id},{clave: 0},cb);
}

ProfesorSchema.statics.delete = function(id, cb) {
  this.model('Profesor').findByIdAndRemove(id).exec(cb);
}

ProfesorSchema.statics.getProfesores = function(cb) {
  this.model('Profesor').find({},{clave: 0},cb);
}

ProfesorSchema.statics.getProfesorLike = function(query, cb) {
  this.model('Profesor').find({$or: [{nombres:  {'$regex': query, '$options': 'i' }}, {apellidos: {'$regex': query, '$options': 'i' }}]}, cb);
}

module.exports = mongoose.model('Profesor', ProfesorSchema);
