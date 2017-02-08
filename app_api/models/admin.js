var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose')

var AdminSchema = mongoose.Schema({
  username: {Type: String},
  password: {Type: String}
})
AdminSchema.plugin(passportLocalMongoose)
mongoose.model('Admin', AdminSchema);
