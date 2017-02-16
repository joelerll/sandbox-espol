angular.module('adminApp').controller('panelController', PanelController)

PanelController.$inyect = ['auth','$location']

function PanelController (auth,$location) {
  var vm = this;

  vm.logout = () => {
    auth.logout();
    $location.path('/');
  }
}
