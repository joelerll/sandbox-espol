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
}
