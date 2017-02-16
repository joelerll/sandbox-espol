var mongoose = require('mongoose'),
jwt          = require('jsonwebtoken'),
config       = require('../config/main'),
bcrypt       = require('bcryptjs');

var AdminSchema = mongoose.Schema({
  username: {type: String, required:  [true, 'no hay username']},
  password: {type: String, required: [true, 'no hay password']}
},{collection: 'admins', versionKey: false})

AdminSchema.methods.generarJwt = function() {
  var expiracion = new Date();
  expiracion.setDate(expiracion.getDate() + 0.1);
  return jwt.sign({
    id: this._id,
    username: this.username,
    exp: parseInt(expiracion.getTime() / 1000),
  }, config.secret );// process.env.JWT_SECRET
};

AdminSchema.statics.getUserById = function(id, cb) {
  return this.findOne({ _id: id }, cb);
}

AdminSchema.statics.getUser = function(username, cb) {
  return this.model('Admin').findOne({ username: username }, cb);
}

AdminSchema.statics.comparePass = function(password, hash, cb){
	bcrypt.compare(password, hash, function(err, isMatch) {
    	if(err) throw err;
    	cb(null, isMatch);
	});
}

// borrar solo de prueba
AdminSchema.methods.savee = function(admin, cb) {
bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(admin.password, salt, function(err, hash) {
        admin.password = hash;
        admin.save(cb);
    });
});
}

module.exports = mongoose.model('Admin', AdminSchema)
