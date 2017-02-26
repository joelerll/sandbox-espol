angular.module('editarEjercicio').component('editarEjercicio', {
  templateUrl: './components/editar-ejercicio/editar-ejercicio.template.html',
  controller: EditarEjercicioController
})

EditarEjercicioController.$inyect = ['$rootScope','Ayudante']

function EditarEjercicioController($rootScope,Ayudante) {
  var vm = this;
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
    Ayudante.updateEjercicio(vm.id, vm.ejercicio, (res) => {
      if (res.data.success) {
        $rootScope.cargar()
      }
    })
  }

  //cambiarlo por Editable table http://vitalets.github.io/angular-xeditable/#editable-table
  // salidas y entradas
  vm.saveTable = () =>{

  }

  vm.cancel = () => {

  }

}
