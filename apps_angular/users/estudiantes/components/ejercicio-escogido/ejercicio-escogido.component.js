angular.module('ejercicioEscogido').component('ejercicioEscogido', {
  templateUrl: './components/ejercicio-escogido/ejercicio-escogido.template.html',
  controller: EjercicioEscogidoController
})

EjercicioEscogidoController.$inyect = ['$rootScope','auth','$http','Upload','$css']

function EjercicioEscogidoController($rootScope,auth,$http,Upload,$css) {
  var vm = this;
  $css.add('./css/ejercicio-escogido.css')
  $rootScope.ejercicioCrear = () => {
    vm.ejercicio = {}
    vm.ejercicio = $rootScope.ejercicio
  }
  vm.file = ''
  vm.alerts = []
  $rootScope.limpiarErrores = () => {
    $( ".errores" ).hide();
    vm.content = ``;
    vm.refresh = true
  }

  vm.editorOptions = {
        lineWrapping : true,
        lineNumbers: true,
        theme: 'icecoder',
        mode: 'python'
    };

    vm.codemirrorLoaded = function(_editor){
    // Editor part
    var _doc = _editor.getDoc();
    _editor.focus();

    // Options
    _editor.setOption('lineWrapping', true);
    _editor.setOption('lineNumbers', true);
    _editor.setOption('theme', 'icecoder');
    _editor.setOption('mode', 'python');
    // _doc.markClean()
    _doc.markText({line: 0, ch: 0}, {line: 1}, {readOnly: false})

    // Events
    // var readOnlyLines = [3];
    _editor.on("beforeChange",function(cm,change) {
      // if ( ~readOnlyLines.indexOf(change.from.line) ) {
      //   change.cancel();
      // }
    });
    _editor.on("change", function(){
      
    });
  };

  vm.content = ``

  vm.eliminarVentanaErrores = () => {
    vm.mostrar_errores = false
  }

  vm.enviarEjercicio = () => {
    console.log(vm.content);
    Upload.upload({
      url: '/api/v1/estudiantes/ejercicio/' + $rootScope.ejercicio._id + '/file',
      headers: {'Authorization': auth.getToken()},
      data: {'nofile': vm.content}
    }).then((res) =>  {
      console.log('fsdffs');
      if (res.data.resuelto) {
        $rootScope.ejercicio = {}
        vm.file = ''
        vm.content = ``;
        notie.alert('success', 'ejercicio correctamente resuelto', 2)
        $( ".errores" ).hide();
        $rootScope.resuelto() //usada en perfil
      } else {
        if (res.data.error) {
          notie.alert('warning', res.data.message, 2)
        } else if (!res.data.success) {
          notie.alert('warning', res.data.message, 2)
          vm.alerts.push({type: 'danger', msg: res.data.errores})
          vm.errores = res.data.errores
          $( ".errores" ).show();
          vm.file = ''
          res.data = ''
        } else {
          notie.alert('warning', 'ejercicio no resuleto correctamente', 2)
          vm.file = ''

          $rootScope.ejercicio = {}
          $( ".errores" ).hide();
          $rootScope.resuelto() //usada en perfil
        }
      }
    })
  }
  vm.subirEjercicio = () => {
    Upload.upload({
      url: '/api/v1/estudiantes/ejercicio/' + $rootScope.ejercicio._id + '/file',
      headers: {'Authorization': auth.getToken()},
      data: {'ejercicio': vm.file}
    }).then((res) => {
      if (res.data.resuelto) {
        $rootScope.ejercicio = {}
        vm.file = ''
        notie.alert('success', 'ejercicio correctamente resuelto', 2)
        vm.content = ``;
        $( ".errores" ).hide();
        $rootScope.resuelto() //usada en perfil
      } else {
        if (!res.data.success) {
          notie.alert('warning', res.data.message, 2)
          vm.alerts.push({type: 'danger', msg: res.data.errores})
          vm.errores = res.data.errores
          $( ".errores" ).show();
          vm.file = ''
          res.data = ''
        } else {
          notie.alert('warning', 'ejercicio no resuleto correctamente', 2)
          vm.file = ''

          $rootScope.ejercicio = {}
          $( ".errores" ).hide();
          $rootScope.resuelto() //usada en perfil
        }
      }
    })
  }
}
