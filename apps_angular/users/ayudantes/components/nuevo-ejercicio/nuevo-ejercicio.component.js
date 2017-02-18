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

  vm.button = {
  "toggle": false,
  "checkbox": {
    "left": false,
    "middle": true,
    "right": false
  },
  "radio": 0
};

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
  vm.addSalida = () => {
    vm.inserted = ''
    vm.ejercicio.salidas.push(vm.inserted)
  }

  vm.saveSalida = (data, id) => {
    console.log(data)
    console.log(id)
    vm.ejercicio.salidas[id] = data.salida
    // vm.ejercicio.salidas.push = data.salida
    // vm.ejercicio.salidas.push(data.salida)
  }

  vm.cancelSalida = () => {
    vm.ejercicio.salidas.pop()
  }

  vm.removeSalida = (index) => {
    vm.ejercicio.salidas.splice(index, 1)
  }

  vm.addEntrada = () => {
    vm.inserted_entrada = ''
    vm.ejercicio.entradas.push(vm.inserted_entrada)
  }

  vm.saveEntrada = (data, id) => {
    vm.ejercicio.entradas[id] = data.entrada
  }

  vm.cancelEntrada = () => {
    vm.ejercicio.entradas.pop()
  }

  vm.removeEntrada = (index) => {
    vm.ejercicio.entradas.splice(index, 1)
  }
}
