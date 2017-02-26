angular.module('ayudantesApp').service('Ayudante', AyudanteController);

AyudanteController.$inyect = ['auth','$http'];

function AyudanteController(auth,$http) {

  var todoLosEjercicios = function(cb) {
    $http({
      method: 'GET',
      url: '/api/v1/ayudantes/ejercicios/mis/todos',
      headers: {'Authorization': auth.getToken()}
    }).then(cb)
  }

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

  var eliminarEjercicio = function (id, cb) {
    $http({
      method: 'DELETE',
      url: '/api/v1/ayudantes/ejercicios/' + id,
      headers: {'Authorization': auth.getToken()}
    }).then(cb)
  }

    var getEjercicioById = function (id_ejercicio, cb) {
      $http({
        method: 'GET',
        url: '/api/v1/ayudantes/ejercicios/' + id_ejercicio,
        headers: {'Authorization': auth.getToken()}
      }).then(cb)
    }

    var updateEjercicio = function (id_ejercicio,ejercicio, cb) {
      $http({
        method: 'PUT',
        url: '/api/v1/ayudantes/ejercicios/' + id_ejercicio,
        headers: {'Authorization': auth.getToken()},
        data: ejercicio
      }).then(cb)
    }


  return {
    misEjercicios: misEjercicios,
    crearEjercicio: crearEjercicio,
    todoLosEjercicios: todoLosEjercicios,
    eliminarEjercicio: eliminarEjercicio,
    getEjercicioById: getEjercicioById,
    updateEjercicio: updateEjercicio
  }
}
