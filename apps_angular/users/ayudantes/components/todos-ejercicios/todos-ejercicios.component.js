angular.module('todosEjercicios').component('todosEjercicios', {
  templateUrl: './components/todos-ejercicios/todos-ejercicios.template.html',
  controller: TodoEjerciciosController
})

TodoEjerciciosController.$inyect = ['Ayudante','$rootScope']

function TodoEjerciciosController(Ayudante,$rootScope) {
  var vm = this;
  vm.ejercicios = []
  Ayudante.todoLosEjercicios((res) => {
    vm.ejercicios = res.data.ejercicios
      vm.temp = []
    vm.ejercicio = vm.temp;
  })

  //externo
  $rootScope.cargar2 = function() {
    Ayudante.todoLosEjercicios((res) => {
      vm.ejercicios = res.data.ejercicios
      vm.temp = []
      vm.ejercicio = vm.temp;
    })
  }
}
