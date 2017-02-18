angular.module('todosEjercicios').component('todosEjercicios', {
  templateUrl: './components/todos-ejercicios/todos-ejercicios.template.html',
  controller: TodoEjerciciosController
})

TodoEjerciciosController.$inyect = ['Ayudante']

function TodoEjerciciosController(Ayudante) {
  var vm = this;
  vm.ejercicios = []
  Ayudante.todoLosEjercicios((res) => {
    if (res.data.sucess) {
      vm.ejercicios = res.data.ejercicios
    }
  })
}
