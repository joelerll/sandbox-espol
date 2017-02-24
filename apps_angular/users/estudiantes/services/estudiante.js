angular.module('estudiantesApp').service('Estudiante', AyudanteController);

AyudanteController.$inyect = ['auth','$http'];

function AyudanteController(auth,$http) {

  var getEtiquetas = function(cb) {
    $http({
      method: 'GET',
      url: '/api/v1/estudiantes/etiquetas',
      headers: {'Authorization': auth.getToken()}
    }).then(cb)
  }

  var getEjerciciosEtiquetaYDificultad = function(etiqueta, dificultad, cb) {
    $http({
      method: 'GET',
      url: '/api/v1/estudiantes/ejercicios?dificultad=' +dificultad + '&etiqueta=' + etiqueta,
      headers: {'Authorization': auth.getToken()}
    }).then(cb)
  }

  var perfil = function(cb) {
    $http({
      method: 'GET',
      url: '/api/v1/estudiantes/perfil',
      headers: {'Authorization': auth.getToken()}
    }).then(cb)
  }
  return {
    getEtiquetas: getEtiquetas,
    getEjerciciosEtiquetaYDificultad: getEjerciciosEtiquetaYDificultad,
    perfil: perfil
  }
}
