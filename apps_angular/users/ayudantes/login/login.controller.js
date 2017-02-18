angular.module('ayudantesApp').controller('LoginController', LoginController);

LoginController.$inyect = ['$http','auth'];

function LoginController($http,auth) {
  var vm = this;
  vm.ayudante = {
    correo: '',
    clave: ''
  }
  vm.login = () => {
    auth.login(vm.ayudante, (res) => {
      console.log(res)
    })
  }
}
