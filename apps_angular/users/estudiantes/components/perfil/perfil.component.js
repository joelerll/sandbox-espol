angular.module('estudiantesApp').component('perfil', {
  templateUrl:  './components/perfil/perfil.template.html',
  controller: HelloController
})

HelloController.$inyect = ['$stateParams']

function HelloController($stateParams) {
  var vm = this;
  
}
