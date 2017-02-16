angular.module('adminApp').controller('LoginController', LoginController);

LoginController.$inyect = ['auth','$location'];

function LoginController (auth,$location) {
  var vm = this;

  vm.admin = {
    username: '',
    password: ''
  };

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
