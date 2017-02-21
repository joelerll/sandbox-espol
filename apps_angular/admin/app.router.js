var app = angular.module('adminApp').config(RouterController);

RouterController.$inyect = ['$stateProvider','$locationProvider','$urlRouterProvider'];

function RouterController ($stateProvider, $locationProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
  $locationProvider.hashPrefix('');

  $stateProvider.
  state('login', {
    name: 'login',
    url: '/',
    templateUrl: './login/login.template.html',
    css: './css/login.css',
    controllerAs: 'vm',
    controller: 'LoginController',
    data: {
      authorization: false,
      redirectTo: 'panel',
    }
  }).
  state('panel', {
    name: 'panel',
    url: '/panel',
    controller: 'panelController',
    controllerAs: 'vm',
    templateUrl: './panel/panel.template.html',
    css: './css/panel.css',
    data: {
      authorization: true,
      redirectTo: 'login',
      memory: false,
    }
  })

}
app.run(function($rootScope, $state,auth,$window) {
  $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
    if(auth.isLoggedIn() && toState.name == 'login') {
      $window.location.href = '/admin/#/panel'
    }
    if(toState.data.authorization && !auth.isLoggedIn() && toState.name == 'panel') {
      $state.go("login");
    }
  });
})
