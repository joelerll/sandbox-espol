angular.module('estudiantesApp').component('desafio', {
  templateUrl:  './components/desafio/desafio.template.html',
  controller: Controller
})

Controller.$inyect = ['Estudiante']

function Controller(Estudiante) {
  var vm = this;
  vm.tomarDesafio = function() {
    Estudiante.desafio((res) =>  {
      var socket = io.connect('http://localhost:4000');
      socket.on('connect', function(){
        console.log('conectado')
      });
      socket.on('disconnect', function(){
        console.log('desconetado')
      });
    })
  }
}
