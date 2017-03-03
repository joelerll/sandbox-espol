angular.module('estudiantesApp').controller('PanelController', PanelController);

PanelController.$inyect = ['Estudiante','auth','$location'];

function PanelController (Estudiante,auth,$location) {
  var vm = this;
  vm.correo = auth.parseJwt().correo
  vm.estudiante = {}

  vm.logout = () => {
    auth.logout()
    $location.path('/')
  }

  vm.tabs = {
    perfil : true,
    resolver : false,
    clave: false
  }

  vm.tabs.clicks = {
    perfil: function () {
      console.log('Dio click en perfil')
      vm.tabs.perfil = true;
      vm.tabs.resolver = false;
      vm.tabs.clave = false;
    },
    resolver : function () {
      vm.tabs.perfil = false;
      vm.tabs.resolver = true;
      vm.tabs.clave = false;
    },
    clave : function () {
      vm.tabs.perfil = false;
      vm.tabs.resolver = false;
      vm.tabs.clave = true;
    }
  }
}
