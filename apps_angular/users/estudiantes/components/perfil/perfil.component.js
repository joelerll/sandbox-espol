angular.module('perfil').component('perfil', {
  templateUrl: './components/perfil/perfil.template.html',
  controller: PerfilController
})

PerfilController.$inyect = ['Estudiante','$css','$rootScope']

function PerfilController(Estudiante,$css,$rootScope) {
  var vm = this;
  $css.add('./css/perfil.css');
  
  var perfilCargar = () => {
    Estudiante.perfil((res) => {
      if (res.data.success) {
        res.data.estudiante._ejercicios.forEach((ejercicio) => {
          if (ejercicio.resuelto) {
            vm.ejercicios.resueltos.push(ejercicio)
          } else {
            vm.ejercicios.noResueltos.push(ejercicio)
          }
        })
        vm.estudiante = res.data.estudiante
        return;
      }
      console.log(res)
    })
  }

  vm.estudiante = {}
  vm.ejercicios = {
    resueltos: [],
    noResueltos: []
  }
  $rootScope.resuelto = () => {
    perfilCargar()
  }
  perfilCargar()

}
