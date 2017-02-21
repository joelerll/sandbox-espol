var router         = require('express').Router(),
AyudanteController = require('../controllers/ayudantes'),
passport           = require('passport'),
EjercicioController = require('../controllers/ejercicios');

var auth = passport.authenticate('ayudante-jwt', { session: false });

// passport configs
require('../config/passport.users.login')( passport );
require('../config/passport.users.jwt')( passport );
router.post('/login', AyudanteController.login);

router.post('/ejercicios', auth, EjercicioController.create);
router.get('/ejercicios', auth, EjercicioController.getAllMisEjercicios);
router.delete('/ejercicios/:id', auth, EjercicioController.esCreador, EjercicioController.del);
router.put('/ejercicios/:id', auth, EjercicioController.update);

router.get('/ejercicios/todos',auth, EjercicioController.getAllOfAll);
module.exports = router
