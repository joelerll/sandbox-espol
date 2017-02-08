var express = require('express');
var router = express.Router()
var passport = require('passport')
var ProfesorController = require('../controllers/profesores')
var AdminController = require('../controllers/admin')
var app = express()
var jwt = require('express-jwt');
var auth = jwt({
  secret: "123",
  userProperty: 'payload'
});


function isAuthenticated (req, res, next) {
  if (req.isAuthenticated()){
    return next()
  }
  res.redirect('/admin/login');
}

// profesor CRUD
router.post('/profesores',  ProfesorController.create);
router.get('/profesores', ProfesorController.read); //?like
router.put('/profesores/:id', ProfesorController.update);
router.delete('/profesores/:id', ProfesorController.delete)

//admin dashboard  AdminController.login

router.get('/admin/login', AdminController.login)

router.post('/admin/login',AdminController.logininng)

router.get('/admin/dashboard', isAuthenticated , AdminController.dashboard)
router.get('/admin/logout', function(req, res){
	req.logout();
	res.redirect('/admin/login');
})



module.exports = router
