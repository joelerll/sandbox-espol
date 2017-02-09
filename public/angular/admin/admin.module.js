angular.module('appAdmin',['ngCookies']).
  controller('AdminController', function($scope, $http, $window,$cookies) {
    $scope.nombre = 'sadsadswe'
    $scope.username = ''
    $scope.password = ''
    $scope.submit = function() {
      $http.post('/api/v1/admin/login', {username: $scope.username, password: $scope.password}).then(function(respuesta){
          console.log(respuesta)
          $cookies.put('id', respuesta.data.token)
          $window.localStorage['loc8r-token'] = respuesta.data.token;
      })
    }
    $scope.logout = function() {
      /*
      $http.get('/api/v1/admin/logout').then(function(data) {
        console.log(data)
      })*/
      $window.localStorage.clear()
        //localStorage.removeItem("loc8r-token")
    }
  })
  .config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('//');
    $interpolateProvider.endSymbol('//');
  });
