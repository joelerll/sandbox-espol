angular.module('cursos').component('cursos', {
  templateUrl: './components/cursos/cursos.template.html',
  controller: CursosController
})

CursosController.$inyect = ['Curso','auth','$http','Upload','$rootScope','$scope','$window'];

function CursosController(Curso,auth,$http,Upload,$rootScope,$scope,$window) {
  $scope.sortType = 'numero_paralelo';
  $scope.sortReverse = false;
  $scope.searchParalelo = '';
  $scope.searchProfesor = '';
  $scope.searchNumAlum = '';

  var vm = this
  vm.cursos = []
  vm.curso = {
    numero_paralelo: ''
  }
  vm.alumno_escogido = ''
  vm.file = ''
  vm.profesor_escogido = ''
  vm.accionCurso = {}

  vm.getAll = function() {
    //Lleno el array cursos con los datos obtenidos de Mongo
    Curso.getAll((res) => {
      if (res.data.success) {
        vm.cursos = res.data.cursos
      } else {
        console.log(res)
      }
    })
  }
  vm.getAll();

  vm.create = function() {
    self.sanitizar();
    Curso.create(vm.curso,(res) => {
      if (res.data.success) {
        notie.alert('success','Se creo correctamente', 2);
        vm.getAll()
        vm.curso.numero_paralelo = ''
      } else {
        notie.alert('danger', 'Hubo un error', 2)
      }
    })
  }

  vm.del = function(id) {
    Curso.del(id,(res) => {
      if (res.data.success) {
        notie.alert('success', 'El curso fue eliminado', 2)
        vm.getAll();
        return;
      }
      console.log(res);
    })
  }


  //tabla
  vm.tabla_acciones = {
    editar: false,
    tabla: true,
    ver: false
  }

  //tabs de tabla
  vm.tabla = function() {
    vm.tabla_acciones.editar = false
    vm.tabla_acciones.tabla = true
    vm.tabla_acciones.ver = false
    $window.scrollTo(0, 0);
    vm.file = '' //limpiar el archivo
  }
  vm.editar = function(curso) {
    accionEditar(curso)
    vm.tabla_acciones.editar = true
    vm.tabla_acciones.tabla = false
    vm.tabla_acciones.var = false
    $window.scrollTo(0, 0);
  }
  vm.ver = function(curso) {
    accionVer(curso)
    vm.tabla_acciones.editar = false
    vm.tabla_acciones.tabla = false
    vm.tabla_acciones.ver = true
  }

  var accionVer = function (curso) {
    vm.accionCurso = curso
  }

  var accionEditar = function (curso) {
    vm.accionCurso = curso
  }

  vm.buscarProfesor = function(val) {
    return Curso.buscarProfesor(val);
  }

  vm.addProfesor = function() {

    if (!vm.profesor_escogido._id) return;
    Curso.addProfesor(vm.accionCurso._id,vm.profesor_escogido._id, (res) => {
      if (res.data.success) {
        notie.alert('success', 'Se guardo profesor', 2)
        vm.getAll();
        vm.accionCurso._profesor = res.data.curso._profesor
        vm.profesor_escogido = ''
        return
      }else{
        notie.alert('error', 'No se pudo añadir profesor', 2)
      }
      console.log(res.data)
    })
  }

  vm.addAlumno = function(id_alumno, id_curso) {
    if (!vm.alumno_escogido._id) return;
    Curso.addAlumno(vm.accionCurso._id,vm.alumno_escogido._id, (res) => {
      if (res.data.success) {
        notie.alert('success', 'Se guardo alumno', 2)
        vm.getAll();
        vm.alumno_escogido = ''
        vm.accionCurso = res.data.curso
        return
      }else{
        notie.alert('error', 'No se pudo añadir alumno', 2)
      }
      console.log(res.data)
    })
  }

  vm.buscarAlumno = function(val) {
    return Curso.buscarAlumno(val);
  }

  vm.deleteEstudiante = function(id_estudiante) {
    Curso.deleteEstudiante(vm.accionCurso._id, id_estudiante, (res) => {
      if (res.data.success) {
        notie.alert('success', 'Se borro el estudiante', 2);
        vm.getAll();
        actualizarAccionCursoBorrar(id_estudiante)
      } else {
        console.log(res.data)
      }
    })
  }

  vm.deleteProfesor = function(id_profesor) {
    Curso.deleteProfesor(vm.accionCurso._id, id_profesor, (res) => {
      if (res.data.success) {
        notie.alert('success', 'Se borro el profesor de curso',2);
        vm.accionCurso._profesor = ''
        vm.getAll();
      } else {
        console.log(res.data);
      }
    })
  }

  var actualizarAccionCursoBorrar = (id_estudiante) => {
    var cons = 0
    vm.accionCurso._estudiantes.forEach((estudiante) => {
      if (estudiante._id == id_estudiante) {
        vm.accionCurso._estudiantes.splice(cons,1)
        return;
      }
      cons = cons + 1
    })
  }

  vm.subirAlumnos = () => {
    var curso_id = ''
    Curso.upload(vm.accionCurso._id,vm.file,(res) => {
      if (res.data.success) {
        vm.file = false
        Curso.getById(vm.accionCurso._id, (res) => {
          if (res.data.success) {
            vm.accionCurso._estudiantes = res.data.curso._estudiantes
            //resetear todos los estudiantes de la pesana estudiantes
            $rootScope.getAllEstudiantes();
          }
        })
        notie.alert('success', 'Creados correctamente', 2)
      } else {
        console.log(res)
        notie.alert('warning', 'hubo un error ', 2)
      }
    } )
  }


    self.sanitizar = () => {
    self.curso.numero_paralelo = filterXSS(self.curso.numero_paralelo)
  }

}


angular.module('cursos').directive('validacionParalelo', function(){
  return{
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, element, attr, ctrl){
      function customValidator(ngModelValue){
        if(/[\W]/.test(ngModelValue)){
          ctrl.$setValidity('specialCharVal', false);
        }else{
          ctrl.$setValidity('specialCharVal', true);
          //console.log('No se permiten caracteres especiales');
        }
        if(/[A-Za-z]/.test(ngModelValue)){
          ctrl.$setValidity('letterVal', false);
        }else{
          ctrl.$setValidity('letterVal', true);
          //console.log('No se permiten caracteres especiales');
        }
        return ngModelValue;
      }
      ctrl.$parsers.push(customValidator);
    }
  }
})
