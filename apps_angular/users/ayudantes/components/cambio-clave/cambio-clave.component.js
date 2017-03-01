angular.module('cambioClave').component('cambioClave', {
  templateUrl: './components/cambio-clave/cambio-clave.template.html',
  controller: CambioClaveController
})

CambioClaveController.$inyect = ['Ayudante'];

function CambioClaveController(Ayudante) {
  var vm = this;
  vm.claves = {
    clave: '',
    clave_confirmacion: '',
    clave_nueva: ''
  }

  vm.alerts = []
  vm.addAlert = function() {
   vm.alerts.push({msg: 'Another alert!'});
 };

 vm.closeAlert = function(index) {
   vm.alerts.splice(index, 1);
 };

  vm.actualizarClave = () => {
    Ayudante.cambiarClave(vm.claves,(res) => {
      if (res.data.success) {
        console.log('clave cambiada');
      } else {
        vm.alerts.push({type: 'danger', msg: res.data.message});
      }
    })
  }
}
