angular.module('appAdmin')
angular.module('appAdmin').
  config(['$stateProvider','$locationProvider','$urlRouterProvider', function($stateProvider,$locationProvider,$urlRouterProvider) {
     $urlRouterProvider.otherwise('/');
     $locationProvider.hashPrefix('');
     $stateProvider.state('login', {
       name: 'default',
       url: '/',
       controller: 'LoginController',
       controllerAs: 'ctrl',
       templateUrl: './login/login.template.html',
       data: {
          authorization: false,
          redirectTo: 'dashboard',
        },
      })
      .state('dashboard', {
         name: 'dashboard',
         url: '/dashboard',
         controller: 'dashboardController',
         controllerAs: 'ctrl',
         templateUrl: './dashboard/dashboard.template.html',
         css: ['./css/admin.css','./css/custom.css'],
         data: {
          authorization: true,
          redirectTo: 'login',
          memory: false,
        },
      })
      //$locationProvider.html5Mode({ enabled: true, requireBase: false})
}])
.run(function($rootScope, $state,auth,$window) {
  $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
    if(auth.isLoggedIn() && toState.name == 'login') {
      $window.location.href = '/admin/#/dashboard'
    }
    if(toState.data.authorization && !auth.isLoggedIn() && toState.name=='dashboard') {
      $state.go("login");
    }
  });
})
