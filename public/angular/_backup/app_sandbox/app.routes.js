function config ($stateProvider,$locationProvider) {
  $locationProvider.hashPrefix('');
  var states = [
    {
      name: 'hello',
      url: '/hello',
      template: '<h3>hello world</h3>'
    },
    {
      name: 'admin',
      url: '/admin',
      component: 'admin'
    }
  ]

  states.forEach(function(state) {
    $stateProvider.state(state);
  });
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
}

angular
  .module('sanboxApp')
  .config(['$stateProvider','$locationProvider', config]);
