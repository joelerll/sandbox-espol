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
  vm.subirEjercicio = () => {
    console.log(vm.file)
    Upload.upload({
      url: '/api/v1/estudiantes/ejercicio/' + $rootScope.ejercicio._id + '/file',
      headers: {'Authorization': auth.getToken()},
      data: {'ejercicio': vm.file}
    }).then((res) => {
      console.log(res);
      if (res.data.resuelto) {
        $rootScope.ejercicio = {}
        vm.file = ''
        vm.errores = ''
        notie.alert('success', 'ejercicio correctamente resuelto', 2)
        $rootScope.resuelto() //usada en perfil
      } else {
        console.log('no resuleto');
        if (!res.data.success) {
          notie.alert('warning', res.data.message, 2)
          vm.errores = res.data.errores
          vm.file = ''
        } else {
          notie.alert('warning', 'ejercicio no resuleto correctamente', 2)
          vm.errores = ''
          vm.file = ''
          $rootScope.ejercicio = {}
          $rootScope.resuelto() //usada en perfil
        }
      }
    })
  }
}
