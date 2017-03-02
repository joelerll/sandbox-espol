angular.module('editarEjercicio').component('editarEjercicio', {
  templateUrl: './components/editar-ejercicio/editar-ejercicio.template.html',
  controller: EditarEjercicioController
})

EditarEjercicioController.$inyect = ['$rootScope','Ayudante', '$css']

function EditarEjercicioController($rootScope,Ayudante, $css) {
  var vm = this;
  $css.add('./css/nuevo-ejercicio.css')
  $rootScope.editadoId = (id) => {
    vm.id = id
    Ayudante.getEjercicioById(id, (res) => {
      vm.tags = []
      vm.tags = res.data.ejercicio.etiquetas
      vm.val = []
      for (var i = 0; i < res.data.ejercicio.entradas.length; i++) {
        vm.val.push({salida: res.data.ejercicio.salidas[i], entrada: res.data.ejercicio.entradas[i]})
      }
      vm.ejercicio = {
        titulo: res.data.ejercicio.titulo,
        descripcion: res.data.ejercicio.descripcion,
        entradas: [],
        salidas: [],
        etiquetas: res.data.ejercicio.etiquetas,
        dificultad: res.data.ejercicio.dificultad
      }

    })
  }

  // importante al momento de guardar regresa a mis ejerciicos
  vm.guardar_ejercicio = () => {
    //guarda el ejercicio => te regresa a mis ejercicios 
    $rootScope.guardar()
  }

  vm.val = [
  ]

  vm.addRow = () => {
    vm.vacio = {
      id: vm.val.length + 1,
      entrada: '',
      salida: ''
    }
    vm.val.push(vm.vacio)
  }

  vm.deleteKey = (id) => {
    let cont = 0;
    vm.val.forEach((val) => {
      if (val.id == id) {
        vm.val.splice(cont,1)
      }
      cont = cont + 1
    })
  }

  vm.guardar = () => {
    vm.ejercicio.entradas = [];
    vm.ejercicio.salidas = []
    vm.val.forEach((valores) => {
      vm.ejercicio.entradas.push(valores.entrada);
      vm.ejercicio.salidas.push(valores.salida);
    })
  }


  // vm.tags = []

  vm.tagAdded = (tag) => {
    vm.ejercicio.etiquetas.push(tag.text)
  }

  vm.tagRemoved =(tag) => {
    var cont = 0
    vm.ejercicio.etiquetas.forEach((et) => {
      if (et == tag.text) {
          vm.ejercicio.etiquetas.splice(cont,1)
      }
      cont = cont +1
    })
  }
  Ayudante.misEjercicios((res) => {
    $rootScope.ejercicios = res.data.ejercicios
  })

  vm.updateEjercicio = () => {
    vm.sanitizar();
    //console.log(vm.ejercicio);
    Ayudante.updateEjercicio(vm.id, vm.ejercicio, (res) => {
      if (res.data.success) {
        $rootScope.cargar();
        notie.alert('success', 'Actualizado correctamente', 1);
      }else{
        notie.alert('error', 'No se pudo actualizar', 1);
      }
    })
  }

  //cambiarlo por Editable table http://vitalets.github.io/angular-xeditable/#editable-table
  // salidas y entradas
  vm.saveTable = () =>{

  }

  vm.cancel = () => {

  }


  vm.sanitizar = () => {
    vm.ejercicio.titulo = filterXSS(vm.ejercicio.titulo)
    vm.ejercicio.descripcion = filterXSS(vm.ejercicio.descripcion)
    vm.ejercicio.dificultad = filterXSS(vm.ejercicio.dificultad)
    for (var i = 0; i < vm.val.length; i++) {
      vm.val[i].entrada = filterXSS(vm.val[i].entrada);
      vm.val[i].salida = filterXSS(vm.val[i].salida);
    }
  }
}

angular.module('editarEjercicio').directive('tituloVal', function(){
  return{
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, element, attr, ctrl){
      function customValidator(ngModelValue){
        if(/[&<>%#()/''""\\/$^!-]/.test(ngModelValue)){
          ctrl.$setValidity('specialCharVal', false);
          console.log('special Character')
        }else{
          ctrl.$setValidity('specialCharVal', true);
          //console.log('No se permiten caracteres especiales');
        }
        return ngModelValue;
      }
      ctrl.$parsers.push(customValidator);
    }
  }
})