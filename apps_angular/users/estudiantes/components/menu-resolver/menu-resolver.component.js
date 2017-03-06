angular.module('estudiantesApp').component('menuResolver', {
  templateUrl:  './components/menu-resolver/menu-resolver.template.html',
  controller: Controller
})

Controller.$inyect = ['$stateParams']

function Controller($stateParams) {
  var vm = this;
  
}
