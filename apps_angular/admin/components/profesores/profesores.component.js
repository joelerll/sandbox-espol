angular.module('profesores').component('profesores', {
   templateUrl: './components/profesores/profesores.template.html',
   controller: ProfesoresController
 });

ProfesoresController.$inyect = ['$css','$http','Profesores'];

function ProfesoresController($css,$http,Profesores) {
  var self = this;
  self.profesores = []

  Profesores.getAll((res) => {
    self.profesores = res.data;
  })

}
