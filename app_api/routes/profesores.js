var router          = require('express').Router(),
ProfesoresController  = require('../controllers/profesores'),
passport            = require('passport'),
DesafiosController = require('../controllers/desafios'),
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
router.get('/cursos',auth,ProfesoresController.cursos);
router.get('/perfil',auth,ProfesoresController.perfil);
router.post('/desafio', auth, DesafiosController.create);
module.exports = router
