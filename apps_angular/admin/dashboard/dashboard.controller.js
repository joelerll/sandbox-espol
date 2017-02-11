angular.module('appAdmin').
  controller('dashboardController', ['$http','$window','$location','auth','ProfesoresService', function($http,$window,$location,auth,ProfesoresService) {
    var ctrl = this;

    // TODO: eliminar esto
    ctrl.dashboard = function() {
      console.log(ProfesoresService.getAllProfesores())
    }

    ctrl.logout = function() {
        auth.logout();
        $location.path('/');
    }

    //tabs control
    ctrl.tabs = {
      dashboard: true,
      estudiantes: false,
      ayudantes: false,
      profesores: false,
      cursos: false
    }

    // FIXME: mejora de cambio de pestana codigo
    var tabsFalse = function() {
      var tabs_temp = {};
      var arr = _.keys(ctrl.tabs);
      arr.forEach(function(key){
        tabs_temp[key] = false;
      })
      return tabs_temp;
    }
    var setTabClick = function(nombre) {
      tabs = tabsFalse();
      return tabs[nombre] = true;
    }

    ctrl.tabs.clicks = {
      dashboard: function () {
              ctrl.tabs.dashboard = true;
              ctrl.tabs.estudiantes = false;
              ctrl.tabs.ayudantes = false;
              ctrl.tabs.profesores = false;
              ctrl.tabs.cursos = false;
          },
      estudiantes: function () {
              ctrl.tabs.dashboard = false;
              ctrl.tabs.estudiantes = true;
              ctrl.tabs.ayudantes = false;
              ctrl.tabs.profesores = false;
              ctrl.tabs.cursos = false;
          },
      ayudantes: function () {
              ctrl.tabs.dashboard = false;
              ctrl.tabs.estudiantes = false;
              ctrl.tabs.ayudantes = true;
              ctrl.tabs.profesores = false;
              ctrl.tabs.cursos = false;
          },
      profesores: function () {
              ctrl.tabs.dashboard = false;
              ctrl.tabs.estudiantes = false;
              ctrl.tabs.ayudantes = false;
              ctrl.tabs.profesores = true;
              ctrl.tabs.cursos = false;
          },
      cursos: function () {
              ctrl.tabs.dashboard = false;
              ctrl.tabs.estudiantes = false;
              ctrl.tabs.ayudantes = false;
              ctrl.tabs.profesores = false;
              ctrl.tabs.cursos = true;
          },

    }
  }]);
