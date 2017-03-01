angular.module('adminApp').service('Reportes',Reportes);

Reportes.$inyect = ['auth','$http'];

function Reportes (auth,$http) {
  var getDias = (anio1,anio2,mes1,mes2,dia1,dia2,cb) => {
    $http({
      method: 'GET',
      url: `/api/v1/admin/reportes/ejercicios?anio1=${anio1}&anio2=${anio2}&mes1=${mes1}&mes2=${mes2}&dia1=${dia1}&dia2=${dia2}`,
      headers: {'Authorization': auth.getToken()}
    }).then(cb)
  }

  var getCursosEjercicios = (cb) => {
    $http({
      method: 'GET',
      url: '/api/v1/admin/reportes/ejercicios/cursos',
      headers: {'Authorization': auth.getToken()}
    }).then(cb)
  }

  return {
    getDias: getDias,
    getCursosEjercicios: getCursosEjercicios
  }
}
