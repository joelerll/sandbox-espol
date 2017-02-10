angular.module('appAdmin').
  config(['$locationProvider', '$routeProvider', function config($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('');
    $routeProvider
      .when('/dashboard', {
        template: '<h1>dashboard</h1>'
      })
      .otherwise('/');
  }])
