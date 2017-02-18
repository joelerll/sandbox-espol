angular.module('misEjercicios').component('misEjercicios',{
  templateUrl: './components/mis-ejercicios/mis-ejercicios.template.html',
  controller: MisEjerciciosController
})

MisEjerciciosController.$inyect = ['Ayudante'];

function MisEjerciciosController(Ayudante) {
  var vm = this;
  vm.ejercicios = []
  Ayudante.misEjercicios((res) => {
    vm.ejercicios = res.data.ejercicios
  })
}
