angular.module('estudiantesApp').component('desafio', {
  templateUrl:  './components/desafio/desafio.template.html',
  controller: Controller
})

Controller.$inyect = ['Estudiante']

function Controller(Estudiante) {
  var vm = this;

}
