angular.module('perfil').component('perfil', {
  templateUrl: './components/perfil/perfil.template.html',
  controller: PerfilController
})

PerfilController.$inyect = ['Estudiante','$css','$rootScope']

function PerfilController(Estudiante,$css,$rootScope) {
  var vm = this;
  $css.add('./css/perfil.css')
  vm.estudiante = {}
  $rootScope.resuelto = () => {
    Estudiante.perfil((res) => {
      if (res.data.success) {
        vm.estudiante = res.data.estudiante
        return;
      }
      console.log(res)
    })
  }
  Estudiante.perfil((res) => {
    if (res.data.success) {
      vm.estudiante = res.data.estudiante
        console.log(vm.estudiante)
      return;
    }
    console.log(res)
  })




}

