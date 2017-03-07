angular.module('estudiantesApp').component('menuResolver', {
  templateUrl:  './components/menu-resolver/menu-resolver.template.html',
  controller: Controller
})

Controller.$inyect = ['Estudiante']

function Controller(Estudiante) {
  var vm = this;
  Estudiante.getEjerciciosEtiquetaYDificultad('uno','facil', (res) => {
    
  })
}
