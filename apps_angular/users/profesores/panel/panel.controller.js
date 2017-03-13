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
    mis: false,
    todos: false,
    editar: false,
    clave: false,
    desafio: true
  }

  vm.tabs.clicks = {
    nuevo: () => {
      console.log(auth.parseJwt())
      vm.tabs.nuevo = true
      vm.tabs.mis = false
      vm.tabs.todos = false
      vm.tabs.editar = false
      vm.tabs.clave = false
      vm.tabs.desafio = false
    },
    mis: () => {
      vm.tabs.nuevo = false
      vm.tabs.mis = true
      vm.tabs.todos = false
      vm.tabs.editar = false
      vm.tabs.clave = false
      vm.tabs.desafio = false
    },
    todos: () => {
      vm.tabs.nuevo = false
      vm.tabs.mis = false
      vm.tabs.todos = true
      vm.tabs.editar = false
      vm.tabs.clave = false
      vm.tabs.desafio = false
    },
    editar: () => {
      vm.tabs.nuevo = false
      vm.tabs.mis = false
      vm.tabs.todos = false
      vm.tabs.editar = true
      vm.tabs.clave = false
      vm.tabs.desafio = false
    },
    clave: () => {
      vm.tabs.nuevo = false
      vm.tabs.mis = false
      vm.tabs.todos = false
      vm.tabs.editar = false
      vm.tabs.clave = true
      vm.tabs.desafio = false
    },
    desafio: () => {
      vm.tabs.nuevo = false
      vm.tabs.mis = false
      vm.tabs.todos = false
      vm.tabs.editar = false
      vm.tabs.clave = false
      vm.tabs.desafio = true
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
