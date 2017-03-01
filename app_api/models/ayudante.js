var mongoose    = require('mongoose'),
bcrypt          = require('bcryptjs'),
uniqueValidator = require('mongoose-unique-validator'),
shortId         = require('shortid'),
jwt             = require('jsonwebtoken'),
config          = require('../config/main');

mongoose.Promise = global.Promise;

var AyudanteSchema = mongoose.Schema({
  _id: {
	    type: String,
	    unique: true,
	    'default': shortId.generate
	},
  correo:              {
    type: String,
    unique: [true]
  },
  clave:               {
    type: String
  },
  rol:                 {
    type: String,
    enum: ['ayudante'],
    default: 'ayudante'
  },
  tipo_identificacion: {
    type: String,
    enum: ['matricula'],
    default: 'matricula'
  },
  //TODO: regex Ayudantee matricula
  identificacion:      {
    type: String,
    unique: true
  },
  nombres:             {
    type: String,
  },
  apellidos:           {
    type: String,
  },
  carrera: {
    type: String
  }
},{collection: 'ayudantes', versionKey: false, timestamps: true})

AyudanteSchema.plugin(uniqueValidator);

AyudanteSchema.methods.generarJwt = function() {
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

AyudanteSchema.pre('save', function (next) {
  const ayudante = this;
  if (this.isNew) {
    let clave = shortId.generate()
    ayudante.clave = clave;
    ayudante.clave = '1'
    console.log('clave ayudante ' + ayudante.clave)
    //error = mail.enviar(this.correo,ayudante.clave);
    // if (error) {
    //   next(new Error('error al enviar mail'));
    // }
  }
  console.log(this.isModified('clave'))
  console.log(this.isNew)
  if (this.isModified('clave') || this.isNew) {
    console.log('modificado clave')
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        return next(err);
      }
      bcrypt.hash(ayudante.clave, salt, function(err, hash) {
        if (err) {
          return next(err);
        }
        ayudante.clave = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

AyudanteSchema.statics.getPorCorreo = function(correo, cb)  {
  this.model('Ayudante').findOne({correo: correo}, cb);
}

AyudanteSchema.pre('update', function(next) {
  console.log('editado')
  next()
})

AyudanteSchema.statics.cambioClave = function(id_ayudante, nueva_clave_hash, cb) {
  this.model('Ayudante').findOneAndUpdate({_id:id_ayudante}, {$set: {clave: nueva_clave_hash}}, cb)
}

AyudanteSchema.statics.comparePass = function(password, hash, cb){
	bcrypt.compare(password, hash, function(err, isMatch) {
    	if(err) {
        console.log('error');
        cb(null,false)
      }
    	cb(null, isMatch);
	});
}

AyudanteSchema.methods.create = function(cb) {
  this.save(cb);
}

AyudanteSchema.statics.getById = function(id, cb) {
  this.model('Ayudante').findOne({ _id:  id },{clave: 0}, cb);
}

AyudanteSchema.statics.getByIdCompleto = function(id, cb) {
  this.model('Ayudante').findOne({ _id:  id }, cb);
}

AyudanteSchema.statics.delete = function(id, cb) {
  this.model('Ayudante').findByIdAndRemove(id).exec(cb)
}

AyudanteSchema.statics.getAll = function(cb) {
  this.model('Ayudante').find({},{clave: 0},cb)
}

AyudanteSchema.statics.getAyudanteLike = function(query, cb) {
  this.model('Ayudante').find({$or: [{nombres:  {'$regex': query, '$options': 'i' }}, {apellidos: {'$regex': query, '$options': 'i' }}]}, cb)
}

AyudanteSchema.statics.update = function(id,admin_nuevo, cb ) {
  console.log(admin_nuevo)
   this.model('Ayudante').findOneAndUpdate({_id: id}, {$set: {identificacion: admin_nuevo.identificacion, nombres: admin_nuevo.nombres, apellidos: admin_nuevo.apellidos, cedula: admin_nuevo.cedula, carrera: admin_nuevo.carrera, correo: admin_nuevo.correo}}, {upsert:true}, cb);
}

module.exports = mongoose.model('Ayudante', AyudanteSchema);
