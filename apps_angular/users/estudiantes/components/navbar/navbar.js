angular.module('estudiantesApp').component('navbar', {
  templateUrl:  './components/navbar/navbar.template.html',
  controller: NavbarController
})

NavbarController.$inyect = ['$http','$state','$scope']

function NavbarController($http,$state,$scope) {
  var vm = this;
  vm.nombre = 'joel'
  console.log()
  console.log($state.current.data.customData1)
}
