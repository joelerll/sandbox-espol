angular.module('ejercicioEscoger').component('ejercicioEscoger',{
  templateUrl: './components/ejercicio-escoger/ejercicio-escoger.template.html',
  controller: EscogerEjercicioController
})


EscogerEjercicioController.$inyect = ['Estudiante','$css','$rootScope'];

function EscogerEjercicioController(Estudiante,$css,$rootScope) {
  var vm = this;
  $css.add('./css/ejercicio-escoger.css')
  vm.etiquetas = []
  Estudiante.getEtiquetas((res) => {
    if (res.data.success) {
      vm.etiquetas = res.data.etiquetas
    }
  })
  vm.etiqueta = ''
  vm.etiqueta_escogida = (etiqueta) => {
    vm.etiqueta = etiqueta
  }

  vm.dificultad_escogida = ''
  vm.ejercicios_posibles = []
  vm.ejercicio = {}
  vm.ejercicio_escoger_boton = (ejercicio) => {
    vm.ejercicio = ejercicio;
    $rootScope.ejercicio = vm.ejercicio
    $rootScope.ejercicioCrear()
  }
  vm.ejercicio_mostar = (cont) => {

  }
  vm.escogerEjercicios = () => {
    Estudiante.getEjerciciosEtiquetaYDificultad(vm.etiqueta,vm.dificultad_escogida, (res) => {
      vm.ejercicios_posibles = res.data.ejercicios
      if (!vm.ejercicios_posibles.length) {
        notie.alert('success','No se encontraron ejercicios', 2)
      } else {
        vm.mostrar = true
        notie.alert('success', `Se encontraron ${vm.ejercicios_posibles.length} ejercicios` , 2)
      }
    })
  }
}
