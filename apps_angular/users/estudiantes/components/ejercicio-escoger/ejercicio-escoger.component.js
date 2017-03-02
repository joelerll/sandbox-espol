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
  vm.selected = NaN
  vm.etiqueta_escogida = (etiqueta,index) => {
    vm.etiqueta = etiqueta
    vm.selected = index
    console.log(etiqueta);
  }

  vm.dificultad_escogida = 'facil'
  vm.ejercicios_posibles = []
  vm.ejercicio = null
  vm.mostrar = false
  vm.mostrar_escogido = false
  vm.mostrar_opcion = false
  vm.resuelto = false
  $rootScope.ejercicio = null
  vm.ejercicio_escoger_boton = (ejercicio) => {
    vm.mostrar_escogido = true
    vm.ejercicio = ejercicio;
    $rootScope.ejercicio = vm.ejercicio_slide
    $rootScope.ejercicioCrear() //function de ejercicio-escogido
  }
  vm.ejercicio_slide = null
  vm.mostrar = false
  vm.cont = 0
  vm.ejercicio_mostar = (cont) => {
    vm.ejercicio_slide = vm.ejercicios[0]
  }
  vm.ejercicio_siguiente = () => {
    vm.cont = vm.cont +1;
    console.log('siguiente');
    console.log(vm.cont)
    if (vm.ejercicios_posibles.length <= vm.cont) {
      notie.alert('warning', 'se acabaron los ejercicios', 2)
    } else {
      vm.ejercicio_slide = vm.ejercicios_posibles[vm.cont]
    }
  }
  vm.escogerEjercicios = () => {
    vm.cont = 0
    vm.mostrar_opcion = true
    vm.mostrar_escogido = false
    Estudiante.getEjerciciosEtiquetaYDificultad(vm.etiqueta,vm.dificultad_escogida, (res) => {
      vm.ejercicios_posibles = res.data.ejercicios
      vm.ejercicio_slide = vm.ejercicios_posibles[0]
      if (!vm.ejercicios_posibles.length) {
        notie.alert('success','No se encontraron ejercicios', 2)
      } else {
        vm.mostrar = true
        notie.alert('success', `Se encontraron ${vm.ejercicios_posibles.length} ejercicios` , 2)
      }
    })
  }
}
