var mongoose    = require('mongoose'),
bcrypt          = require('bcryptjs'),
uniqueValidator = require('mongoose-unique-validator'),
shortId         = require('shortid');
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
  }
},{collection: 'profesores', versionKey: false, timestamps: true})  //desafios: [{ type : ObjectId, ref: 'Desafio' }]

ProfesorSchema.plugin(uniqueValidator);

ProfesorSchema.pre('save', function (next) {
  const profesor = this;
  if (this.isNew) {
    let clave = shortId.generate()
    console.log('user nuevo ' + clave);
    profesor.clave = clave;
    //error = mail.enviar(this.correo,profesor.clave);
    // if (error) {
    //   next(new Error('error al enviar mail'));
    // }
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
        console.log('la clave es ' + profesor.clave)
        profesor.clave = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

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
  this.model('Profesor').findOne({_id: id},{clave: 0},cb)
}

ProfesorSchema.statics.delete = function(id, cb) {
  this.model('Profesor').findByIdAndRemove(id).exec(cb);
}

ProfesorSchema.statics.getProfesores = function(cb) {
  this.model('Profesor').find({},{clave: 0},cb);
}

ProfesorSchema.statics.getProfesorLike = function(query, cb) {
  this.model('Profesor').find({$or: [{nombres:  {'$regex': query, '$options': 'i' }}, {apellidos: {'$regex': query, '$options': 'i' }}]}, cb)
}

module.exports = mongoose.model('Profesor', ProfesorSchema)
