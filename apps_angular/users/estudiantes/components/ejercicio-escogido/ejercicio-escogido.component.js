angular.module('ejercicioEscogido').component('ejercicioEscogido', {
  templateUrl: './components/ejercicio-escogido/ejercicio-escogido.template.html',
  controller: EjercicioEscogidoController
})

EjercicioEscogidoController.$inyect = ['$rootScope','auth','$http','Upload','$css']

function EjercicioEscogidoController($rootScope,auth,$http,Upload,$css) {
  var vm = this;
  $css.add('./css/ejercicio-escogido.css')
  $rootScope.ejercicioCrear = () => {
    vm.ejercicio = {}
    vm.ejercicio = $rootScope.ejercicio
  }
  vm.file = ''
  vm.alerts = []
  $rootScope.limpiarErrores = () => {
    $( ".errores" ).hide();
  }

  vm.eliminarVentanaErrores = () => {
    vm.mostrar_errores = false
  }
  vm.subirEjercicio = () => {
    Upload.upload({
      url: '/api/v1/estudiantes/ejercicio/' + $rootScope.ejercicio._id + '/file',
      headers: {'Authorization': auth.getToken()},
      data: {'ejercicio': vm.file}
    }).then((res) => {
      if (res.data.resuelto) {
        $rootScope.ejercicio = {}
        vm.file = ''
        notie.alert('success', 'ejercicio correctamente resuelto', 2)
        $( ".errores" ).hide();
        $rootScope.resuelto() //usada en perfil
      } else {
        if (!res.data.success) {
          notie.alert('warning', res.data.message, 2)
          vm.alerts.push({type: 'danger', msg: res.data.errores})
          vm.errores = res.data.errores
          $( ".errores" ).show();
          vm.file = ''
          res.data = ''
        } else {
          notie.alert('warning', 'ejercicio no resuleto correctamente', 2)
          vm.file = ''
          $rootScope.ejercicio = {}
          $( ".errores" ).hide();
          $rootScope.resuelto() //usada en perfil
        }
      }
    })
  }
}
