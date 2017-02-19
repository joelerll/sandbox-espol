ctrl.linkExternal = function (url){
  $window.location.href = url;
}

.run(['$state',
      function($state) {
          $state.transitionTo('login');
}])


$scope.$watch(function() {
  if (!localStorageService.get('local')) {
    return false;
  }
  return true;
}, function(new_value, old_value){
  log(new_value)
  log(old_value)
}, true)


//https://www.npmjs.com/package/bcryptjs
//https://www.npmjs.com/package/uuid
var mongoose = require('mongoose'),
Estudiante     = require('../models/estudiante');
Ejercicio = require('../models/ejercicio');
mongoose.Promise = global.Promise;

module.exports.create = (req, res, next) => {
  let estudiante = new Estudiante({
    nombres: req.body.nombres,
    apellidos: req.body.apellidos
  })

  estudiante.save(estudiante, err => {
    if(err){
      console.log(err)
    } else {
      res.json(estudiante)
    }
  })
}

module.exports.addEjercicio = (req, res, next) => {
  let ejercicio = new Ejercicio({
    titulo: req.body.titulo
  })
  Estudiante.findOneAndUpdate({_id: req.params.id}, {$push: {ejercicios: ejercicio._id}}, (err, otro) => {
    ejercicio.save(ejercicio, (err) => {
      console.log(err)
      return;
    })
    if (err) {
      res.json(err);
      return;
    }
    res.json(otro);
  });
}

module.exports.getEjercicios = (req,res,next) => {
  Estudiante.findOne({_id: req.params.id}).populate('ejercicios').exec(function (err, estudiante) {
  if (err) return handleError(err);
  // console.log('The creator is %s', story._creator.name);
  res.send(estudiante.ejercicios);
  return;
});
}
