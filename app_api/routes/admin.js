var express = require('express');
var router = express.Router()
var passport = require('passport')
var ProfesorController = require('../controllers/profesores')
var AdminController = require('../controllers/admin')
var app = express()
var jwt = require('express-jwt');
var auth = jwt({
  secret: "joeleseljoelsa",
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

//router.get('/admin/login', AdminController.login)

router.post('/admin/login',AdminController.login ) //
//console.log(req.session.passport.user)
router.get('/admin/dashboard', auth, AdminController.dashboard)
router.get('/admin/logout', function(req, res){
	req.logout();
	res.redirect('/admin/login');
})

router.get('/protected',
  jwt({secret: '123'}),
  function(req, res) {
    if (!req.user.admin) return res.sendStatus(401).send('no integado');
    res.sendStatus(200).send('hola integrado');
  });



module.exports = router
