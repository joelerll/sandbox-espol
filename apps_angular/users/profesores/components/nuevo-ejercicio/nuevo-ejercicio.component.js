angular.module('nuevoEjercicio').component('nuevoEjercicio',{
  templateUrl: './components/nuevo-ejercicio/nuevo-ejercicio.template.html',
  controller: NuevoEjercicioController
});

NuevoEjercicioController.$inyect = ['Ayudante','$css','$rootScope'];

function NuevoEjercicioController(Ayudante,$css,$rootScope) {
  var vm = this;
  $css.add('./css/nuevo-ejercicio.css')
  vm.ejercicio = {
    titulo: '',
    descripcion: '',
    entradas: [],
    salidas: [],
    etiquetas: [],
    dificultad: ''
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
    //Guarda los valores de entrada y de salida en el objeto ejercicio
    vm.ejercicio.entradas = [];
    vm.ejercicio.salidas = []
    vm.val.forEach((valores) => {
      vm.ejercicio.entradas.push(valores.entrada);
      vm.ejercicio.salidas.push(valores.salida);
    })
  }


  vm.tags = []

  vm.tagAdded = (tag) => {
    vm.ejercicio.etiquetas.push(tag.text)
  }

  vm.tagRemoved =(tag) => {
    vm.ejercicio.etiquetas.splice(vm.ejercicio.etiquetas.indexOf(tag))
  }
  Ayudante.misEjercicios((res) => {
    $rootScope.ejercicios = res.data.ejercicios
  })
  vm.crearEjercicio = () => {
    vm.sanitizar();
    Ayudante.crearEjercicio(vm.ejercicio, (res) => {
      if (res.data.success) {
        vm.ejercicio = {
          titulo: '',
          descripcion: '',
          entradas: [],
          salidas: [],
          etiquetas: [],
          dificultad: ''
        }
        vm.tags = []
        vm.val = []
        //cargar los ejercicis en mis ejercicios
        $rootScope.cargar()
        $rootScope.cargar2()
        notie.alert('success', 'Ejercicio creado', 1);
      } else {
        console.log(res.data.errors);
        notie.alert('error', 'Hubo un error al crear el ejercicio', 1);
        //errores
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

  vm.prueba = () => {
    console.log(vm.ejercicio.entradas);
    console.log(vm.ejercicio.salidas);
    console.log(vm.val);
    //console.log(vm.ejercicio.salidas);
  }

}


angular.module('nuevoEjercicio').directive('tituloVal', function(){
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