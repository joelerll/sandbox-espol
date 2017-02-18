var router         = require('express').Router(),
AyudanteController = require('../controllers/ayudantes'),
passport           = require('passport'),
EjercicioController = require('../controllers/ejercicios');

var auth = passport.authenticate('ayudante-jwt', { session: false });



router.post('/login', AyudanteController.login);

// passport configs
require('../config/passport.users.login')( passport );
require('../config/passport.users.jwt')( passport );

router.post('/ejercicios', auth, EjercicioController.create);
router.get('/ejercicios', auth, EjercicioController.getAll);
router.delete('/ejercicios/:id', auth, EjercicioController.del);
router.put('/ejercicios/:id', auth, EjercicioController.update);

router.get('/ejercicios/todos',auth, EjercicioController.getAllOfAll);
module.exports = router
