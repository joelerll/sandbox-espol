angular.module('appAdmin').
  config(['$locationProvider','$routeProvider', function($locationProvider, $routeProvider) {
     $locationProvider.hashPrefix('')
     $routeProvider.
      when('/', {
        templateUrl: './login/login.template.html',
        controller: 'AdminController',
        controllerAs: 'ctrl'
      }).
      when('/dashboard', {
        templateUrl: './dashboard/dashboard.template.html',
        controller: 'dashboardController',
        controllerAs: 'ctrl',
        data: {
          authorization: true,
          redirectTo: '/'
        }
      })
      .otherwise({redirectTo: '/'})
  }
])
