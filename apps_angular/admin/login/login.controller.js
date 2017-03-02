angular.module('adminApp').controller('LoginController', LoginController);

LoginController.$inyect = ['auth','$location'];

function LoginController (auth,$location) {
  var vm = this;

  vm.admin = {
    username: '',
    password: ''
  };

  $(document).keypress(function(e){
    if (e.keyCode == 13) {
      vm.submit()
    }
  });

  // alerts
  vm.alerts = [];

  vm.closeAlert = function(index) {
    vm.alerts.splice(index, 1);
  };

  var cleanAlerts = function() {
    vm.alerts = [];
  }

  // submit
  vm.submit = function() {
    cleanAlerts()
    if ( !vm.admin.username && !vm.admin.password ) {
      vm.alerts.push({type: 'danger', msg: 'username y password vacio'});
    } else if (!vm.admin.username) {
      vm.alerts.push({type: 'danger', msg: 'username vacio'});
    } else if (!vm.admin.password) {
      vm.alerts.push({type: 'danger', msg: 'password vacio'});
    } else {
      auth.login(vm.admin, (res) => {
        if(!res) {
          $location.path('/panel');
        } else {
          vm.alerts.push({type: 'danger', msg: res.message});
        }
      })
    }

  }
}


angular.module('adminApp').directive('validacionUsername', function(){
  return{
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, element, attr, ctrl){
      function customValidator(ngModelValue){
        if(/[\W]/.test(ngModelValue)){
          ctrl.$setValidity('specialCharVal', false);
        }else{
          ctrl.$setValidity('specialCharVal', true);
          //console.log('No se permiten caracteres especiales');
        }
        if(/[\d]/.test(ngModelValue)){
          ctrl.$setValidity('numberVal', false);
        }else{
          ctrl.$setValidity('numberVal', true);
          //console.log('No se permiten numeros');
        }
        return ngModelValue;
      }
      ctrl.$parsers.push(customValidator);
    }
  }
})
