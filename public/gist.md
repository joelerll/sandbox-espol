	eduardo@gmail.com
rylXlLnQsg

	joel@gmail.com
Syli0BnXsx



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



// app.run(function(amMoment) {
//     amMoment.changeLocale('es');
// });

  /*$stateProvider.state('navbar.hello', {
    name: 'navbar.hello',
    url: '/{personId}',
    component: 'hello',
    resolve: {
        person: function(people, $stateParams) {
          return people.find(function(person) {
            console.log(person)
            return person.id === $stateParams.personId;
          });
        }
      },
    data: {
      authorization: false,
    }
  })
    $stateProvider.state('navbar', {
    name: 'navbar',
    url: '/navbar',
    component: 'navbar',
    resolve: {
      people: function(PeopleService) {
          return PeopleService.getAllPeople();
        }
    },
    data: {
      customData1: 44,
      authorization: false,
    }
  })
*/


  var deferred = $q.defer(); //devido a que es async las llamadas http, el primise evita q se llame la funcion antes que se obtenga la data

// var perfil = function() {
//   $http({
//     method: 'GET',
//     url: '/api/v1/estudiantes/perfil',
//     headers: {'Authorization': auth.getToken()}
//   }).then(function(res) {
//     deferred.resolve(res.data.estudiante)
//   }).catch(function(res) {
//     deferred.reject(res)
//   })
//   return deferred.promise
// }


/*http://stackoverflow.com/questions/16129157/countdown-timer-using-moment-js*/
var eventTime= 1366549200; // Timestamp - Sun, 21 Apr 2013 13:00:00 GMT
var currentTime = 1366547400; // Timestamp - Sun, 21 Apr 2013 12:30:00 GMT
var diffTime = eventTime - currentTime;
var duration = moment.duration(diffTime*1000, 'milliseconds');
var interval = 1000;
setInterval(function(){
duration = moment.duration(duration - interval, 'milliseconds');
res.io.emit('messages', duration.hours() + ":" + duration.minutes() + ":" + duration.seconds());
}, interval);
