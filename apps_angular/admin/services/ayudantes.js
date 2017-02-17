angular.module('adminApp').service('Ayudantes',Ayudantes);

Ayudantes.$inyect = ['auth','$http'];

function Ayudantes (auth,$http) {
  var getAll = (cb) => {
    $http({
      method: 'GET',
      url: '/api/v1/ayudantes',
      headers: {'Authorization': auth.getToken()}
    }).then(cb)
  }

  var edit = (id,profesor,cb) => {
    $http({
      method: 'PUT',
      url: '/api/v1/ayudantes/' + id,
      data: profesor,
      headers: {'Authorization': auth.getToken()}
    }).then(cb)
  }

  var del = (id,cb) => {
    $http({
      method: 'DELETE',
      url: '/api/v1/ayudantes/' + id,
      headers: {'Authorization': auth.getToken()}
    }).then(cb)
  }

  var create = (profesor, cb) => {
    $http({
      method: 'POST',
      url: '/api/v1/ayudantes',
      headers: {'Authorization': auth.getToken()},
      data: profesor
    }).then(cb)
  }

  return {
    getAll: getAll,
    edit: edit,
    del: del,
    create: create
  }
}
