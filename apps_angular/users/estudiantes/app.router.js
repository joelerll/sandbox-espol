var app = angular.module('estudiantesApp').config(AyudantesConfiguration)

AyudantesConfiguration.$inyect = ['$stateProvider','$urlRouterProvider','$locationProvider']

// FIXME: no se pueden cargar los css por angularCSS
function AyudantesConfiguration ($stateProvider, $urlRouterProvider, $locationProvider) {
  $urlRouterProvider.otherwise('/'); //si en url coloca un url desconocido lleva a /
  $locationProvider.hashPrefix(''); //eliminar el prefix !
  $stateProvider.state('login', {
    url: '/',
    controllerAs: 'vm',
    controller: 'LoginController',
    templateUrl: './login/login.template.html',
    data: {
      authorization: false,
      redirectTo: 'panel',
    }
  })
  .state('panel', {
    url: '/panel',
    controllerAs: 'vm',
    controller: 'PanelController',
    templateUrl: './panel/panel.template.html',
    css: './css/panel.css',
    data: {
      authorization: true,
      redirectTo: 'login',
    }
  })
  .state('perfil', {
    name: 'perfil',
    parent: 'panel', //coge como padre a 'panel' state
    url: '/perfil',
    component: 'perfil'
  })
  .state('menu-resolver', {
    name: 'menu-resolver',
    parent: 'panel',
    url: '/menu-resolver',
    component: 'menuResolver'
  })
  .state('resolver-ejercicio', {
    name: 'resolver-ejercicio',
    parent: 'menu-resolver',
    url: '/resolver-ejercicio',
    component: 'resolverEjercicio'
  })
  .state('cambio-clave', {
    parent: 'panel',
    name: 'cambio-clave',
    url: '/cambio-clave',
    component: 'cambioClave'
  })
  .state('desafio', {
    parent: 'panel',
    name: 'desafio',
    url: '/desafio',
    component: 'desafio'
  })
}

// app.run($trace => $trace.enable(1))

// login controlador, cambio por $ChangeStart eliminado
app.run(function($transitions,auth,$state) {
  $transitions.onStart({}, function($transition$) {
    if (auth.isLoggedIn() && $transition$.$to().name == 'login') {
      $state.go("panel"); // FIXME: transition message
    }
    if($transition$.$to().data.authorization && !auth.isLoggedIn() && $transition$.$to().name == 'panel'){
      $state.go("login");
    }
  });
})
