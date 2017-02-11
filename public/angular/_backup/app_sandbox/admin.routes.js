function config ($stateProvider,$locationProvider,$urlRouterProvider) {
  $locationProvider.hashPrefix('');
  var states = [
    {
      name: 'hello',
      url: '/hello',
      template: '<h3>hello world</h3>'
    },
    {
      name: 'admin',
      url: 'admin/dashboard',
      controllerAs: 'ctrl',
      templateUrl: './dashboard/dashboard.template.html'
    }, {
      name: 'login',
      url: '/admin/login',
      templateUrl: './login/login.template.html'
    }
  ]
  $urlRouterProvider.otherwise('/admin');
  states.forEach(function(state) {
    $stateProvider.state(state);
  });
  $urlRouterProvider.when('/admin', '/admin/login');
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
}

angular
  .module('appAdmin')
  .config(['$stateProvider','$locationProvider','$urlRouterProvider', config]);
