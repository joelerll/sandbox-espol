var app = angular.module('estudiantesApp').config(AyudantesConfiguration)

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
  $stateProvider.state('perfil', {
    name: 'perfil',
    parent: 'panel',
    url: '/perfil',
    component: 'perfil'
  })
  $stateProvider.state('panel.menu-resolver', {
    name: 'panel.menu-resolver',
    url: '/menu-resolver',
    component: 'menuResolver'
  })
  $stateProvider.state('panel.menu-resolver.resolver-ejercicio', {
    name: 'panel.menu-resolver.resolver-ejercicio',
    url: '/resolver-ejercicio',
    component: 'resolverEjercicio'
  })
  $stateProvider.state('panel.cambio-clave', {
    name: 'panel.cambio-clave',
    url: '/cambio-clave',
    component: 'cambioClave'
  })
}

app.run(function($rootScope, $state,auth,$window) {
  $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
    if(auth.isLoggedIn() && toState.name == 'login') {
      $window.location.href = '/estudiantes/#/panel'
    }
    if(toState.data.authorization && !auth.isLoggedIn() && toState.name == 'panel') {
      $state.go("login");
    }
  });
})

app.run(function($http) {

  $http.get('data/people.json', { cache: true });
});

// app.run(function(amMoment) {
//     amMoment.changeLocale('es');
// });

  /*$stateProvider.state('navbar.hello', {
    name: 'navbar.hello',
    url: '/{personId}',
    component: 'hello',
    resolve: {
        person: function(people, $stateParams) {
          return people.find(function(person) {
            console.log(person)
            return person.id === $stateParams.personId;
          });
        }
      },
    data: {
      authorization: false,
    }
  })
    $stateProvider.state('navbar', {
    name: 'navbar',
    url: '/navbar',
    component: 'navbar',
    resolve: {
      people: function(PeopleService) {
          return PeopleService.getAllPeople();
        }
    },
    data: {
      customData1: 44,
      authorization: false,
    }
  })
*/