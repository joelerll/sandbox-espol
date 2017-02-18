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
    type: String,
    default: 'clave prueba'
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


AyudanteSchema.statics.getPorCorreo = function(correo, cb)  {
  this.model('Ayudante').findOne({correo: correo}, cb);
}

AyudanteSchema.statics.comparePass = function(clave, hash, cb){
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

AyudanteSchema.statics.getById = function(id, cb) {
  this.findOne({ _id:  id }, cb);
}

module.exports = mongoose.model('Ayudante', AyudanteSchema);
