angular.module('ejercicioEscogido').component('ejercicioEscogido', {
  templateUrl: './components/ejercicio-escogido/ejercicio-escogido.template.html',
  controller: EjercicioEscogidoController
})

EjercicioEscogidoController.$inyect = ['$rootScope','auth','$http','Upload']

function EjercicioEscogidoController($rootScope,auth,$http,Upload) {
  var vm = this;
  vm.ejercicio ={}
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
      if (res.data.success) {
        $rootScope.resuelto()
      }
      console.log(res)
    })
  }
}
