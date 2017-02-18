angular.module('estudiantes').
component('estudiantes',{
  templateUrl: './components/estudiantes/estudiantes.template.html',
  controller: EstudianteController
})

EstudianteController.$inyect = ['$http']

function EstudianteController ($http) {
      var vm = this
      vm.nombre = 'joel'
      vm.getEjercicios = ()=>{
        console.log('get ejercicios')
        $http.post('/api/v1/ejercicios', {titulo: 'uno', etiquetas: ['joel','carlos'], descripcion: 'la casa', entradas: ['joel', 'casita'], salidas: ['casotas', 'casa'], dificultad: 'intermedio'}, (res)=> {
          console.log(res.data)
        })
      }
}
