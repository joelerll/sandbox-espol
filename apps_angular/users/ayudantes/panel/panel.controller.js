angular.module('ayudantesApp').controller('PanelController', PanelController);

PanelController.$inyect = ['Ayudante','auth','$location'];

function PanelController (Ayudante,auth,$location) {
  var vm = this;

  vm.misEjercicios = () => {
    Ayudante.misEjercicios((res) => {
      console.log(res)
    })
  }
  vm.logout = () => {
    auth.logout()
    $location.path('/');
  }

  vm.correo = auth.parseJwt().correo
  //navegacion
  vm.tabs = {
    nuevo: false,
    mis: true,
    todos: false,
  }

  vm.tabs.clicks = {
    nuevo: () => {
      vm.tabs.nuevo = true
      vm.tabs.mis = false
      vm.tabs.todos = false
    },
    mis: () => {
      vm.tabs.nuevo = false
      vm.tabs.mis = true
      vm.tabs.todos = false
    },
    todos: () => {
      vm.tabs.nuevo = false
      vm.tabs.mis = false
      vm.tabs.todos = true
    }
  }
}
