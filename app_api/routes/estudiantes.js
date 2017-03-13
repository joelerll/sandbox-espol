var router           = require('express').Router(),
multer               = require('multer'),
path                 = require('path'),
passport             = require('passport'),
EstudianteController = require('../controllers/estudiantes'),
EjercicioController  = require('../controllers/ejercicios');

var auth = passport.authenticate('estudiante-jwt', { session: false });

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../public/upload/ejercicios'))
    },
    filename: function (req, file, cb) {
        cb(null, req.user._id +'@'+ req.params.id_ejercicio + '.py')
  }
})
var upload = multer({ storage: storage })

router.get('/etiquetas',auth, EjercicioController.getAllEtiquetas);
router.get('/ejercicios',auth, EjercicioController.getByEtiquetaYDificultad);
router.get('/perfil',auth, EstudianteController.perfil);
router.post('/clave', auth,EstudianteController.cambiarClave);
router.get('/desafio',auth, EstudianteController.desafio);
router.post('/ejercicio/:id_ejercicio/file',auth, upload.single('ejercicio'), EjercicioController.comprobarEjercicio);
require('../config/passport.estudiante.login.js')(passport);
require('../config/passport.estudiante.jwt.js')(passport);
router.post('/login', EstudianteController.login);

module.exports = router
