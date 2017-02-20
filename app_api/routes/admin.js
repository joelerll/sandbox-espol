var router         = require('express').Router(),
passport           = require('passport'),
jwt                = require('jsonwebtoken'),
ProfesorController = require('../controllers/profesores'),
AyudanteController = require('../controllers/ayudantes'),
AdminController    = require('../controllers/admin'),
EstudiantesController = require('../controllers/estudiantes'),
EjerciciosController = require('../controllers/ejercicios');

var auth = passport.authenticate('admin-jwt', { session: false });

// profesor CRUD
router.post('/profesores', auth, ProfesorController.create );
router.get('/profesores',auth, ProfesorController.read ); // ?like
router.put('/profesores/:id', auth, ProfesorController.update );
router.delete('/profesores/:id', auth, ProfesorController.delete );
router.get('/profesores/:id', auth, ProfesorController.readOne );

// ayudante CRUD
router.post('/ayudantes', AyudanteController.create );
router.get('/ayudantes',  AyudanteController.read ); // ?like
router.put('/ayudantes/:id', AyudanteController.update );
router.delete('/ayudantes/:id', AyudanteController.del );
router.get('/ayudantes/:id', AyudanteController.readOne );

// estudiante CRUD
router.post('/estudiantes', EstudiantesController.create);
router.get('/estudiantes', EstudiantesController.getAll);
router.put('/estudiantes/:id', EstudiantesController.update);
router.delete('/estudiantes/:id', EstudiantesController.del);

router.put('/estudiantes/clave/:id', EstudiantesController.updateClave);

// ejercicios CRUD
router.post('/ejercicios', EjerciciosController.create);
// router.post('/ejercicios/nuevo/ejercicio/:id', EjerciciosController.addEjercicio);

// passport strategies
require('../config/passport.admin.login')( passport );
require('../config/passport.admin.jwt')( passport );

// admin login
router.post('/login', AdminController.login );
router.get('/dashboard', auth , AdminController.dashboard );

//borrar solo de prueba
router.post('/admin', AdminController.create);

module.exports = router
