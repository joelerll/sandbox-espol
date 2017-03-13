angular.module('estudiantesApp').service('Estudiante', Controller);

Controller.$inyect = ['auth','$http'];

function Controller(auth,$http) {

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

  var cambiarClave = function (claves, cb) {
    $http({
      method: 'POST',
      url: '/api/v1/estudiantes/clave',
      headers: {'Authorization': auth.getToken()},
      data: claves
    }).then(cb)
  }

  var desafio = function(cb) {
    $http({
      method: 'GET',
      url: '/api/v1/estudiantes/desafio',
      headers: {'Authorization': auth.getToken()}
    }).then(cb)
  }

  return {
    getEtiquetas: getEtiquetas,
    getEjerciciosEtiquetaYDificultad: getEjerciciosEtiquetaYDificultad,
    perfil: perfil,
    cambiarClave: cambiarClave,
    desafio: desafio
  }
}
