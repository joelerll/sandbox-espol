angular.module('ayudantesApp').service('Ayudante', AyudanteController);

AyudanteController.$inyect = ['auth','$http'];

function AyudanteController(auth,$http) {
  var misEjercicios = function (cb) {
    $http({
      method: 'GET',
      url: '/api/v1/ayudantes/ejercicios',
      headers: {'Authorization': auth.getToken()}
    }).then(cb)
  }

  var crearEjercicio = function (ejercicio, cb) {
    $http({
      method: 'POST',
      url: '/api/v1/ayudantes/ejercicios',
      headers: {'Authorization': auth.getToken()},
      data: ejercicio
    }).then(cb)
  }

  return {
    misEjercicios: misEjercicios,
    crearEjercicio: crearEjercicio
  }
}
