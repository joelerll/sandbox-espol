angular.module('estudiantesApp').component('perfil', {
  templateUrl:  './components/perfil/perfil.template.html',
  controller: Controller
})

Controller.$inyect = ['Estudiante']

function Controller(Estudiante) {
  var vm = this;

  Estudiante.perfil((res) => {
    if (res.data.success) {
      vm.estudiante = res.data.estudiante
    }
  })
}
