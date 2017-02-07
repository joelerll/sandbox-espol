module.exports.login = function(req, res, next) {
  req.send(200).json({'mensaje': 'admin'})
}


module.exports.dashboard = function(req, res, next) {
  req.send(200).json({'mensaje': 'dashboard'})
}

module.exports.logout = function(req, res, next) {
  req.session.authenticated = false
  req.send(200).json({'mensaje': 'sesion cerrada'})
}
