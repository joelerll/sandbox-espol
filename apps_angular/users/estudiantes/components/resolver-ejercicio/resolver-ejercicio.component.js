angular.module('estudiantesApp').component('resolverEjercicio', {
  templateUrl:  './components/resolver-ejercicio/resolver-ejercicio.template.html',
  controller: Controller
})

Controller.$inyect = ['$stateParams']

function Controller($stateParams) {
  var vm = this;
  
}
