var router = require('express').Router();
var EstudianteController = require('../controllers/estudiantes');
var passport = require('passport');
var auth = passport.authenticate('estudiante-jwt', { session: false });

require('../config/passport.users.login.js')(passport);
require('../config/passport.users.jwt.js')(passport);

router.get('/',auth, function(req, res, next) {
  res.send('maldito estudiante');
})
router.post('/login', EstudianteController.login);

module.exports = router
