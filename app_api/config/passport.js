var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var Admin = mongoose.model('Admin');

passport.use('admin',new LocalStrategy({
  },
  function(username, password, done) {
    Admin.findOne({ username: username, password: password }, function (err, admin) {
      done(null, admin)
    });
  }
));
// 
// passport.serializeUser(function(admin, done) {
//   done(null, admin.id);
// });
//
// passport.deserializeUser(function(id, done) {
//   Admin.getUserById(id, function(err, admin) {
//     done(err, admin)
//   })
// });
