angular.module('appAdmin').
  controller('AdminController', function($scope, $http, $window,$cookies) {
    $scope.nombre = 'sadsadswe'
    $scope.username = ''
    $scope.password = ''
    $scope.submit = function() {
      $http.post('/api/v1/admin/login', {username: $scope.username, password: $scope.password}).then(function(respuesta){
          console.log(respuesta)
          $cookies.put('id', respuesta.data.token)
          $window.localStorage['local'] = respuesta.data.token;
      })
    }
    $scope.logout = function() {
      $window.localStorage.clear()
    }

    $scope.dashboard = function() {
      $http.get('/api/v1/admin/dashboard', { headers: {'Authorization': $window.localStorage['local']}})
           .then(function(res) {
             console.log(res.data)
           })
    }

  })
  .config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('//');
    $interpolateProvider.endSymbol('//');
  });
