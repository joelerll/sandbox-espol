var router         = require('express').Router(),
passport           = require('passport'),
jwt                = require('jsonwebtoken'),
ProfesorController = require('../controllers/profesores'),
AyudanteController = require('../controllers/ayudantes'),
AdminController    = require('../controllers/admin'),
EstudiantesController = require('../controllers/estudiantes'),
EjerciciosController = require('../controllers/ejercicios'),
ReportesController = require('../controllers/reportes'),
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
router.post('/ayudantes',auth, AyudanteController.create );
router.get('/ayudantes',auth,  AyudanteController.read ); // ?like
router.put('/ayudantes/:id',auth, AyudanteController.update );
router.delete('/ayudantes/:id',auth, AyudanteController.del );
router.get('/ayudantes/:id',auth, AyudanteController.readOne );

// estudiante CRUD
router.post('/estudiantes',auth, EstudiantesController.create);
router.get('/estudiantes',auth, EstudiantesController.getAll);
router.put('/estudiantes/:id',auth, EstudiantesController.update);
router.delete('/estudiantes/:id',auth, EstudiantesController.del);
router.put('/estudiantes/clave/:id',auth, EstudiantesController.updateClave);

//Curso
router.get('/cursos',auth, CursosController.read);
router.post('/cursos',auth, CursosController.create);
router.delete('/cursos/:id',auth, CursosController.del);
router.put('/cursos/:id',auth, CursosController.update);
router.post('/cursos/profesores/:id_curso/:id_profesor',auth, CursosController.addProfesor);
router.post('/cursos/estudiantes/:id_curso/:id_estudiante',auth, CursosController.addEstudiante);
router.delete('/cursos/profesores/:id_curso/:id_profesor',auth, CursosController.deleteProfesor);
router.delete('/cursos/estudiantes/:id_curso/:id_estudiante',auth, CursosController.deleteEstudiante);
//registrar estudiates ya existemtes y no en el archivo estudiantes por archivo con file
router.post('/cursos/file/:id',auth, upload.single('curso'), CursosController.estudiantesFile);

router.get('/reportes/ejercicios', ReportesController.cantidadEjerciciosDia);//?mes1=base&mes2=tope&dia1=base&dia2=tope
router.get('/reportes/ejercicios/cursos/:id_curso', ReportesController.cantidadEjericiosPorCurso)

// passport strategies
require('../config/passport.admin.login')( passport );
require('../config/passport.admin.jwt')( passport );

// admin login
router.post('/login', AdminController.login );
router.get('/dashboard', auth , AdminController.dashboard );

//borrar solo de prueba
router.post('/admin', AdminController.create);

module.exports = router
