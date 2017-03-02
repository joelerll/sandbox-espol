var app = angular.module('ayudantesApp').config(AyudantesConfiguration)

AyudantesConfiguration.$inyect = ['$stateProvider','$urlRouterProvider','$locationProvider']

function AyudantesConfiguration ($stateProvider, $urlRouterProvider, $locationProvider) {
  $urlRouterProvider.otherwise('/');
  $locationProvider.hashPrefix('');
  $stateProvider.state('login', {
    url: '/',
    controllerAs: 'vm',
    controller: 'LoginController',
    templateUrl: './login/login.template.html',
    css: './css/login.css',
    data: {
      authorization: false,
      redirectTo: 'panel',
    }
  })
  $stateProvider.state('panel', {
    url: '/panel',
    controllerAs: 'vm',
    controller: 'PanelController',
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
      $window.location.href = '/profesores/#/panel'
    }
    if(toState.data.authorization && !auth.isLoggedIn() && toState.name == 'panel') {
      $state.go("login");
    }
  });
})
