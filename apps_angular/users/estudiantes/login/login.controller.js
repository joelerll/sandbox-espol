angular.module('estudiantesApp').controller('LoginController', LoginController);

LoginController.$inyect = ['$http','auth','$location'];

function LoginController($http,auth,$location) {
  var vm = this;
  vm.estudiante = {
    correo: '',
    clave: ''
  }
  vm.login = () => {
    auth.login(vm.estudiante, (res) => {
      if(res) {
        $location.path('/panel');
      } else {
        // vm.alerts.push({type: 'danger', msg: res.message});
      }
    })
  }

  $(document).keypress(function(e){
    if (e.keyCode == 13) {
      vm.login()
    }
  });


}


angular.module('estudiantesApp').directive('validacionEmailEst', function(){
  return{
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, element, attr, ctrl){
      function customValidator(ngModelValue){
        if(validator.isEmail(ngModelValue)){
          ctrl.$setValidity('emailVal', true);
        }else{
          ctrl.$setValidity('emailVal', false);
        }
        return ngModelValue;
      }
      ctrl.$parsers.push(customValidator);
    }
  }
})
