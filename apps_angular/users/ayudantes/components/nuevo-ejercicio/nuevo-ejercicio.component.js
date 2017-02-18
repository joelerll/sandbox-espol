angular.module('nuevoEjercicio').component('nuevoEjercicio',{
  templateUrl: './components/nuevo-ejercicio/nuevo-ejercicio.template.html',
  controller: NuevoEjercicioController
});

NuevoEjercicioController.$inyect = ['Ayudante'];

function NuevoEjercicioController(Ayudante) {
  var vm = this;
  vm.ejercicio = {
    titulo: '',
    descripcion: '',
    entradas: [],
    salidas: [],
    etiquetas: [],
    dificultad: ''
  }

  vm.crearEjercicio = () => {
    Ayudante.crearEjercicio(vm.ejercicio, (res) => {
      console.log(res)
    })
  }
}
