var router         = require('express').Router(),
passport           = require('passport'),
jwt                = require('jsonwebtoken'),
ProfesorController = require('../controllers/profesores'),
AyudanteController = require('../controllers/ayudantes'),
AdminController    = require('../controllers/admin'),
EstudiantesController = require('../controllers/estudiantes'),
EjerciciosController = require('../controllers/ejercicios'),
CursosController = require('../controllers/cursos');
var multer  = require('multer');
const path = require('path');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../public/upload/temp'))
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '.csv')
  }
})
var upload = multer({ storage: storage })

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

//Curso
router.get('/cursos', CursosController.read);
router.post('/cursos', CursosController.create);
router.delete('/cursos/:id', CursosController.del);
router.put('/cursos/:id', CursosController.update);
router.post('/cursos/profesores/:id_curso/:id_profesor', CursosController.addProfesor);
router.post('/cursos/estudiantes/:id_curso/:id_estudiante', CursosController.addEstudiante);
router.delete('/cursos/profesores/:id_curso/:id_profesor', CursosController.deleteProfesor);
router.delete('/cursos/estudiantes/:id_curso/:id_estudiante', CursosController.deleteEstudiante);

//registrar estudiates ya existemtes y no en el archivo estudiantes por archivo con file
router.post('/cursos/file/:id', upload.single('curso'), CursosController.estudiantesFile);
//registrar un cursos completo con profesores, curso info y alumnos
// router.post('/cursos/file', upload.single('curso'),CursosController.cursoFile);


// ejercicios CRUD
// router.post('/ejercicios', EjerciciosController.create);
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
