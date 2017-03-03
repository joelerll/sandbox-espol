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
    perfil : false,
    resolver : true
  }

  vm.clicks = {
    perfil: () => {
      vm.tabs.perfil = true
      vm.tabs.resolver = false
    },
    resolver : () => {
      vm.tabs.perfil = false,
      vm.tabs.resolver = true
    }
  }
}
