var router = require('express').Router();
var EstudianteController = require('../controllers/estudiantes');
var passport = require('passport');
var auth = passport.authenticate('estudiante-jwt', { session: false });
var EjercicioController = require('../controllers/ejercicios')
var multer  = require('multer');
const path = require('path');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../public/upload/ejercicios'))
    },
    filename: function (req, file, cb) {
        cb(null, req.user._id +'@'+ req.params.id_ejercicio + '.py')
  }
})
var upload = multer({ storage: storage })

require('../config/passport.estudiante.login.js')(passport);
require('../config/passport.estudiante.jwt.js')(passport);
router.post('/login', EstudianteController.login);

router.get('/etiquetas', EjercicioController.getAllEtiquetas);
router.get('/ejercicio', EjercicioController.getByEtiquetaYDificultad);
router.post('/ejercicio/:id_ejercicio/file',auth,upload.single('ejercicio'), EjercicioController.comprobarEjercicio);
// // router.put('/estudiantes/clave/:id', EstudiantesController.updateClave);

module.exports = router
