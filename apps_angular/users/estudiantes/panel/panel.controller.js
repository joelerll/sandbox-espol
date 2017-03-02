angular.module('estudiantesApp').controller('PanelController', PanelController);

PanelController.$inyect = ['Estudiante','auth','$location'];

function PanelController (Estudiante,auth,$location) {
  var vm = this;
  vm.correo = auth.parseJwt().correo
  vm.estudiante = {}
  //vm.estudiante = auth.parseJwt();
  
  
  console.log(Estudiante.perfil)
  console.log(auth.parseJwt())
  console.log(vm.estudiante)


  vm.logout = () => {
    auth.logout()
    $location.path('/')
  }

  vm.tabs = {
    perfil : true,
    resolver : false
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
