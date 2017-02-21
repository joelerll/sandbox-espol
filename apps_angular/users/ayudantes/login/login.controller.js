angular.module('ayudantesApp').controller('LoginController', LoginController);

LoginController.$inyect = ['$http','auth','$location'];

function LoginController($http,auth,$location) {
  var vm = this;
  vm.ayudante = {
    correo: '',
    clave: ''
  }
  vm.login = () => {
    auth.login(vm.ayudante, (res) => {
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
