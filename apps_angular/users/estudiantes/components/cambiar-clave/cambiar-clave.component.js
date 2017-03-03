angular.module('cambiarClave').component('cambiarClave', {
  templateUrl: './components/cambiar-clave/cambiar-clave.template.html',
  controller: CambiarClaveController
})

CambiarClaveController.$inyect = ['Estudiante','$css']

function CambiarClaveController(Estudiante,$css) {
  var vm = this
  $css.add('./css/cambio-clave.css')
  vm.claves = {
    clave: '',
    clave_confirmacion: '',
    clave_nueva: ''
  }
  vm.alerts = []
  vm.closeAlert = function(index) {
    vm.alerts.splice(index, 1);
  };
  vm.actualizarClave = () => {
    Estudiante.cambiarClave(vm.claves,(res) => {
      vm.alerts = []
      if (res.data.success) {
        vm.claves = {}
          //vm.alerts.push({type: 'success', msg: res.data.message});
        notie.alert('success', 'Clave cambiada correctamente', 1)
      } else {
        //vm.alerts.push({type: 'danger', msg: res.data.message});
        notie.alert('error', res.data.message, 1)
      }
    })
  }
}
