angular.module('appAdmin').
  controller('dashboardController', ['$http','$window','auth','$location', function($http,$window,auth,$location) {
    var ctrl = this;
    ctrl.dashboard = function() {
      $http.get('/api/v1/admin/dashboard',
        { headers: {'Authorization': $window.localStorage['local']}})
        .then(function(res) {
             console.log(res.data)
        })
    }
    ctrl.logout = function() {
        auth.logout();
        $location.path('/');
    }
  }]);
