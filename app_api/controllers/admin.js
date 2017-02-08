var passport = require('passport')

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.login = function(req, res, next) {
  res.json({'mensaje': 'admin'})
}


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
