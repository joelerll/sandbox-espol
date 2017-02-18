angular.module('ayudantesApp').controller('PanelController', PanelController);

PanelController.$inyect = ['Ayudante'];

function PanelController (Ayudante) {
  var vm = this;

  vm.misEjercicios = () => {
    Ayudante.misEjercicios((res) => {
      console.log(res)
    })
  }
}
