var router         = require('express').Router(),
passport           = require('passport'),
jwt                = require('jsonwebtoken'),
ProfesorController = require('../controllers/profesores'),
AyudanteController = require('../controllers/ayudantes'),
AdminController    = require('../controllers/admin');

var auth = passport.authenticate('admin-jwt', { session: false });

// profesor CRUD
router.post('/profesores', auth, ProfesorController.create );
router.get('/profesores', auth, ProfesorController.read ); // ?like
router.put('/profesores/:id', auth, ProfesorController.update );
router.delete('/profesores/:id', auth, ProfesorController.delete );
router.get('/profesores/:id', auth, ProfesorController.readOne );

// ayudante CRUD
router.post('/ayudantes', auth, AyudanteController.create );
router.get('/ayudantes', auth, AyudanteController.read ); // ?like
router.put('/ayudantes/:id', auth, AyudanteController.update );
router.delete('/ayudantes/:id', auth, AyudanteController.delete );
router.get('/ayudantes/:id', auth, AyudanteController.readOne );

// passport strategies
require('../config/passport.admin.login')( passport );
require('../config/passport.admin.jwt')( passport );

// admin login
router.post('/admin/login', AdminController.login );
router.get('/admin/dashboard', auth , AdminController.dashboard );

//borrar solo de prueba
router.post('/admin', AdminController.create);

module.exports = router
