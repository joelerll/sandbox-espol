angular.module('estudiantesApp').component('cambioClave', {
  templateUrl:  './components/cambio-clave/cambio-clave.template.html',
  controller: Controller
})

Controller.$inyect = ['$stateParams']

function Controller($stateParams) {
  var vm = this;
  
}
