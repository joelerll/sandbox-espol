angular.module('adminApp').controller('panelController', PanelController)

PanelController.$inyect = ['auth','$location','$window']

function PanelController (auth,$location,$window) {
  var vm = this;

  vm.logout = () => {
    auth.logout();
    $location.path('/');
  }

  vm.tabs = {
    dashboard: true,
    estudiantes: false,
    ayudantes: false,
    profesores: false,
    cursos: false
  }

  vm.tabs.clicks = {
    dashboard: function () {
      vm.tabs.dashboard = true;
      vm.tabs.estudiantes = false;
      vm.tabs.ayudantes = false;
      vm.tabs.profesores = false;
      vm.tabs.cursos = false;
      $window.scrollTo(0, 0);
    },
    estudiantes: function () {
      vm.tabs.dashboard = false;
      vm.tabs.estudiantes = true;
      vm.tabs.ayudantes = false;
      vm.tabs.profesores = false;
      vm.tabs.cursos = false;
      $window.scrollTo(0, 0);
    },
    ayudantes: function () {
      vm.tabs.dashboard = false;
      vm.tabs.estudiantes = false;
      vm.tabs.ayudantes = true;
      vm.tabs.profesores = false;
      vm.tabs.cursos = false;
      $window.scrollTo(0, 0);
    },
    profesores: function () {
      vm.tabs.dashboard = false;
      vm.tabs.estudiantes = false;
      vm.tabs.ayudantes = false;
      vm.tabs.profesores = true;
      vm.tabs.cursos = false;
      $window.scrollTo(0, 0);
    },
    cursos: function () {
      vm.tabs.dashboard = false;
      vm.tabs.estudiantes = false;
      vm.tabs.ayudantes = false;
      vm.tabs.profesores = false;
      vm.tabs.cursos = true;
      $window.scrollTo(0, 0);
    },
  }
}
