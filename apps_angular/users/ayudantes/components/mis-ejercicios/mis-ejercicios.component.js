angular.module('misEjercicios').component('misEjercicios',{
  templateUrl: './components/mis-ejercicios/mis-ejercicios.template.html',
  controller: MisEjerciciosController,
  bindings: {
  show: '='
   }
})

MisEjerciciosController.$inyect = ['Ayudante','$rootScope','$css'];

function MisEjerciciosController(Ayudante,$rootScope,$css) {
  var vm = this;
  $css.add('./css/mis-ejercicios.css')
  vm.ejercicios = []
  //llamarlo al principio
  Ayudante.misEjercicios((res) => {
    vm.ejercicios = res.data.ejercicios
      vm.temp = []
    vm.ejercicio = vm.temp;
  })

  //externo
  $rootScope.cargar = function() {
    Ayudante.misEjercicios((res) => {
      vm.ejercicios = res.data.ejercicios
      vm.temp = []
      vm.ejercicio = vm.temp;
    })
  }


  vm.eliminarEjercicio = (id) => {
    Ayudante.eliminarEjercicio(id, (res) => {
      if (res.data.success) {
        $rootScope.cargar2()
        Ayudante.misEjercicios((res) => {
          vm.ejercicios = res.data.ejercicios
            vm.temp = []
          vm.ejercicio = vm.temp;
        })
      }
    })
  }
}
