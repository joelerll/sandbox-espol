var mongoose    = require('mongoose'),
bcrypt          = require('bcryptjs'),
uniqueValidator = require('mongoose-unique-validator'),
shortId         = require('shortid');
mail            = require('../config/mail.js');

var AyudanteSchema = mongoose.Schema({
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
    enum: ['estudiante'],
    default: 'estudiante',
    required: [true, 'rol es requerido']
  },
  tipo_identificacion: {
    type: String,
    enum: ['matricula'],
      default: 'matricula',
    required: [true, 'tipo identificacion es requerido']
  },
  //TODO: regex Ayudantee cedula
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
  ejercicios: [{ type: String, ref: 'Ejercicio' }],
  puntaje: {
    type: Number
  },
  badge: {
    enum: ['novato','pro','experto','indestructible','duro_de_matar','rapido_y_fusioso'],
    default: 'novato',
  }
},{collection: 'ayudantes', versionKey: false, timestamps: true})
//desafios_participado: [], subdocumento, ejercicios subdocumento

AyudanteSchema.plugin(uniqueValidator);

AyudanteSchema.pre('save', function (next) {
  const ayudante = this;
  if (this.isNew) {
    let clave = shortId.generate()
    // console.log('user nuevo ' + clave);
    ayudante.clave = clave;
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
      bcrypt.hash(ayudante.clave, salt, function(err, hash) {
        if (err) {
          return next(err);
        }
        // console.log('la clave es ' + ayudante.clave)
        ayudante.clave = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

AyudanteSchema.methods.create = function(cb) {
  this.save(cb);
}

AyudanteSchema.statics.update = function(id,admin_nuevo, cb ) {
   this.model('Ayudante').findOneAndUpdate({_id: id}, admin_nuevo, {upsert:true}, cb);
}

AyudanteSchema.statics.getAyudante = function(correo, cb) {
  this.model('Ayudante').findOne({correo: correo},{clave: 0}, cb);
}

AyudanteSchema.statics.getAyudanteById = function(id, cb) {
  this.model('Ayudante').findOne({_id: id},{clave: 0},cb)
}

AyudanteSchema.statics.delete = function(id, cb) {
  this.model('Ayudante').findByIdAndRemove(id).exec(cb);
}

AyudanteSchema.statics.getAyudantes = function(cb) {
  this.model('Ayudante').find({},{clave: 0},cb);
}

AyudanteSchema.statics.getAyudanteLike = function(query, cb) {
  this.model('Ayudante').find({$or: [{nombres:  {'$regex': query, '$options': 'i' }}, {apellidos: {'$regex': query, '$options': 'i' }}]}, cb)
}

module.exports = mongoose.model('Ayudante', AyudanteSchema)
