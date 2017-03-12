angular.module('estudiantesApp').controller('PanelController', PanelController);

PanelController.$inyect = ['auth','$location'];

function PanelController (auth,$location) {
  var vm = this;
  vm.correo = auth.parseJwt().correo
  vm.estudiante = {}

  // vm.logout = () => {
  //   auth.logout()
  //   $location.path('/')
  // }
}
