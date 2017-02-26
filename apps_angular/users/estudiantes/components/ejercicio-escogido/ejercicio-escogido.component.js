angular.module('ejercicioEscogido').component('ejercicioEscogido', {
  templateUrl: './components/ejercicio-escogido/ejercicio-escogido.template.html',
  controller: EjercicioEscogidoController
})

EjercicioEscogidoController.$inyect = ['$rootScope','auth','$http','Upload','$css']

function EjercicioEscogidoController($rootScope,auth,$http,Upload,$css) {
  var vm = this;
  vm.ejercicio ={}
  $css.add('./css/ejercicio-escogido.css')
  $rootScope.ejercicioCrear = () => {
    vm.ejercicio = $rootScope.ejercicio
  }
  vm.file = {}
  vm.subirEjercicio = () => {
    console.log(vm.file)
    Upload.upload({
      url: '/api/v1/estudiantes/ejercicio/' + vm.ejercicio._id + '/file',
      headers: {'Authorization': auth.getToken()},
      data: {'ejercicio': vm.file}
    }).then((res) => {
      if (res.data.resuelto) {
        notie.alert('success', 'ejercicio correctamente resuelto', 2)
        $rootScope.resuelto()
      } else {
        notie.alert('warning', 'ejercicio no fue resuelto', 2)
      }
    })
  }
}
