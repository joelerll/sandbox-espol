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
    console.log('si cargado');
    console.log(vm.ejercicio);
  }
  vm.file = {}
  vm.subirEjercicio = () => {
    console.log(vm.file)
    Upload.upload({
      url: '/api/v1/estudiantes/ejercicio/' + $rootScope.ejercicio._id + '/file',
      headers: {'Authorization': auth.getToken()},
      data: {'ejercicio': vm.file}
    }).then((res) => {
      if (res.data.resuelto) {
        $rootScope.ejercicio = {}
        notie.alert('success', 'ejercicio correctamente resuelto', 2)
        $rootScope.resuelto() //usada en perfil
      } else {
        $rootScope.ejercicio = {}
          $rootScope.resuelto() //usada en perfil
        notie.alert('warning', 'ejercicio no fue resuelto', 2)
      }
    })
  }
}
