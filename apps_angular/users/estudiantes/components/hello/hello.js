angular.module('estudiantesApp').component('hello', {
  templateUrl:  './components/hello/hello.template.html',
  controller: HelloController
})

HelloController.$inyect = ['$stateParams']

function HelloController($stateParams) {
  var vm = this;
  console.log($stateParams.personId)
}
