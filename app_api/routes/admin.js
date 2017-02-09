var router         = require('express').Router(),
passport           = require('passport'),
jwt                = require('jsonwebtoken'),
ProfesorController = require('../controllers/profesores'),
AdminController    = require('../controllers/admin');

var auth = passport.authenticate('admin-jwt', { session: false });

// profesor CRUD
router.post('/profesores',  ProfesorController.create );
router.get('/profesores', ProfesorController.read ); //?like
router.put('/profesores/:id', ProfesorController.update );
router.delete('/profesores/:id', ProfesorController.delete );


// passport strategies
require('../config/passport.admin.login')( passport );
require('../config/passport.admin.jwt')( passport );

// admin login
router.post('/admin/login', AdminController.login );
router.get('/admin/dashboard', auth , AdminController.dashboard );

//borrar solo de prueba
router.post('/admin', AdminController.create);

module.exports = router
