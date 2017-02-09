var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var AdminSchema = mongoose.Schema({
  username: {Type: String},
  password: {Type: String}
},{collection: 'admins'})

AdminSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);
  return jwt.sign({
    _id: this._id,
    username: this.username,
    password: this.password,
    exp: parseInt(expiry.getTime() / 1000),
  },"joeleseljoelsa" ); // DO NOT KEEP YOUR SECRET IN THE CODE! process.env.JWT_SECRET
};

AdminSchema.statics.getUserById = function(id, cb) {
  return this.model('Admin').findOne({_id: id}, cb)
}

mongoose.model('Admin', AdminSchema);
