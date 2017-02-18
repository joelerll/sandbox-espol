angular.module('nuevoEjercicio').component('nuevoEjercicio',{
  templateUrl: './components/nuevo-ejercicio/nuevo-ejercicio.template.html',
  controller: NuevoEjercicioController
});

NuevoEjercicioController.$inyect = ['Ayudante'];

function NuevoEjercicioController(Ayudante) {
  var vm = this;
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

  vm.crearEjercicio = () => {
    Ayudante.crearEjercicio(vm.ejercicio, (res) => {
      console.log(res)
    })
  }

  //cambiarlo por Editable table http://vitalets.github.io/angular-xeditable/#editable-table
  // salidas y entradas
  vm.saveTable = () =>{

  }

  vm.cancel = () => {

  }
}
