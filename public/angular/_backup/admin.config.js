angular.module('appAdmin').
  controller('AdminController', function($scope, $http, $window,auth,$location) {
    $scope.nombre = 'sadsadswe'
    $scope.username = ''
    $scope.password = ''

    $scope.submit = function() {

      /*
      $http.post('/api/v1/admin/login', {username: $scope.username, password: $scope.password}).then(function(respuesta){
          console.log(respuesta)
          $window.localStorage['local'] = respuesta.data.token;
      })*/
      console.log({username: $scope.username, password: $scope.password})
      auth.login({username: $scope.username, password: $scope.password})
      //$location.path('/dashboard')
    }
    $scope.logout = function() {
      auth.logout()
    }

    $scope.dashboard = function() {
      $http.get('/api/v1/admin/dashboard', { headers: {'Authorization': $window.localStorage['local']}})
           .then(function(res) {
             console.log(res.data)
           })
    }

    $scope.linkExternal = function (url){
      $window.location.href = url;
    }

    $scope.cambio = function() {

    }


  })
