angular.module('estudiantesApp').config(AyudantesConfiguration)

AyudantesConfiguration.$inyect = ['$stateProvider','$urlRouterProvider','$locationProvider']

function AyudantesConfiguration ($stateProvider, $urlRouterProvider, $locationProvider) {
  $urlRouterProvider.otherwise('/');
  $locationProvider.hashPrefix('');
  $stateProvider.state('login', {
    url: '/',
    controllerAs: 'vm',
    controller: 'LoginController',
    templateUrl: './login/login.template.html'
  })
  $stateProvider.state('panel', {
    url: '/panel',
    controllerAs: 'vm',
    controller: 'PanelController',
    templateUrl: './panel/panel.template.html'
  })
}
