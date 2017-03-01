angular.module('ayudantesApp').controller('PanelController', PanelController);

PanelController.$inyect = ['Ayudante','auth','$location','$rootScope'];

function PanelController (Ayudante,auth,$location,$rootScope) {
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
    editar: false,
  }

  vm.tabs.clicks = {
    nuevo: () => {
      console.log(auth.parseJwt())
      vm.tabs.nuevo = true
      vm.tabs.mis = false
      vm.tabs.todos = false
      vm.tabs.editar = false
    },
    mis: () => {
      vm.tabs.nuevo = false
      vm.tabs.mis = true
      vm.tabs.todos = false
      vm.tabs.editar = false
    },
    todos: () => {
      vm.tabs.nuevo = false
      vm.tabs.mis = false
      vm.tabs.todos = true
      vm.tabs.editar = false
    },
    editar: () => {
      vm.tabs.nuevo = false
      vm.tabs.mis = false
      vm.tabs.todos = false
      vm.tabs.editar = true
    }
  }

  //dependiente de editar ejercicio y de panel
  $rootScope.editar = (id) => {
    $rootScope.editadoId(id) //editar-ejercicio
    vm.tabs.clicks.editar()
  }

  $rootScope.guardar = () => {
    vm.tabs.clicks.mis() //stablece que al guardar al editar se coloque en la pestana mis ejercicios
    vm.misEjercicios() //ver mis ejerciicos
  }
}
