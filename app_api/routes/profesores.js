var router          = require('express').Router(),
ProfesoresController  = require('../controllers/profesores'),
passport            = require('passport'),
EjercicioController = require('../controllers/ejercicios');

var auth = passport.authenticate('profesor-jwt', { session: false });

// passport configs
require('../config/passport.profesor.login')( passport );
require('../config/passport.profesor.jwt')( passport );
router.post('/login', ProfesoresController.login);

router.post('/ejercicios', auth, EjercicioController.create);
router.get('/ejercicios', auth, EjercicioController.getAllMisEjercicios);
router.get('/ejercicios/:id', auth, EjercicioController.getOne);
router.delete('/ejercicios/:id', auth, EjercicioController.esCreador, EjercicioController.del);
router.put('/ejercicios/:id', auth, EjercicioController.update);
router.post('/clave', auth,ProfesoresController.cambiarClave);
router.get('/ejercicios/mis/todos',auth, EjercicioController.getAllOfAll);
module.exports = router
