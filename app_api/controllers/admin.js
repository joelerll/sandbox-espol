var passport = require('passport')
var mongoose = require('mongoose');
var Admin = mongoose.model('Admin')
var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.login = function(req, res){
  passport.authenticate('admin', function(err, admin, info) {
    console.log(req.admin)
    console.log(req.user)
    if (admin) {
      console.log(admin)
      token = admin.generateJwt();
      res.json({'mensaje': 'autenticado', 'token': token})
    } else {
      res.json({'mensaje': 'no autenticado'})
    }
  })(req, res);
}
/*
module.exports.login = passport.authenticate('admin',{successRedirect:'/api/v1/admin/dashboard', failureRedirect:'/api/v1/admin/login',failureFlash: true})
*/
module.exports.dashboard = function(req, res, next) {
  res.json({'mensaje': 'dashboard'})
}

module.exports.logout = function(req, res, next) {
  res.json({'mensaje': 'admin'})
}

module.exports.logininng = function(req, res, next) {
  if(!req.body.username || !req.body.password) {
   sendJSONresponse(res, 400, {
     "message": "All fields required"
   });
   return;
 }

 passport.authenticate('admin', function(err, admin, info){
   var token;

   if (err) {
     sendJSONresponse(res, 404, err);
     return;
   }

   if(admin){
     token = admin.generateJwt();
     sendJSONresponse(res, 200, {
       "token" : token
     });
   } else {
     sendJSONresponse(res, 401, info);
   }
 })(req, res);
}
