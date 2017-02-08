var express = require('express');
var router = express.Router()
var ProfesorController = require('../controllers/profesores')
var AdminController = require('../controllers/admin')
var isAuthenticated_admin = require('../middlewares/auth_admin')
var app = express()

// profesor CRUD
router.post('/profesores',  ProfesorController.create);
router.get('/profesores', ProfesorController.read); //?like
router.put('/profesores/:id', ProfesorController.update);
router.delete('/profesores/:id', ProfesorController.delete)

//admin dashboard  AdminController.login
router.post('/admin/login', AdminController.login)
router.get('/admin/dashboard', AdminController.dashboard)
router.get('/admin/logout', AdminController.logout)

module.exports = router
