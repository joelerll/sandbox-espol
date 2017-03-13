angular.module('estudiantesApp').component('desafio', {
  templateUrl:  './components/desafio/desafio.template.html',
  controller: Controller
})

Controller.$inyect = ['Estudiante','auth']

function Controller(Estudiante,auth) {
  var vm = this;
  // vm.tomarDesafio = function() {
    Estudiante.desafio((res) =>  {
      var socket = io.connect('http://localhost:4000',{
        extraHeaders: {
          Authorization: auth.getToken()
        },
        transports: ['websocket']
      });
      socket.on('connect', function(){
        socket.on(auth.parseJwt().id, function(data) {
          console.log(data)
          vm.desafio_tomado = data.conectado
          console.log(vm.desafio_tomado)
          data = ''
        })
      });
      socket.on('disconnect', function(){
        console.log('desconetado')
      });
    })

}
