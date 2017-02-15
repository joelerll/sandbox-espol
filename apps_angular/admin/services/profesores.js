angular.module('adminApp').service('Profesores',Profesores);

Profesores.$inyect = ['auth','$http'];

function Profesores (auth,$http) {
  var getAll = (cb) => {
    $http({
      method: 'GET',
      url: '/api/v1/profesores',
      headers: {'Authorization': auth.getToken()}
    }).then(cb)
  }

  return {
    getAll: getAll
  }
}
