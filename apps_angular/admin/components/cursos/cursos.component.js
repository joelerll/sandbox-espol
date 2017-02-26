angular.module('cursos').component('cursos', {
  templateUrl: './components/cursos/cursos.template.html',
  controller: CursosController
})

CursosController.$inyect = ['Curso','auth','$http','Upload','$rootScope'];

function CursosController(Curso,auth,$http,Upload,$rootScope, $scope) {
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
    Curso.create(vm.curso,(res) => {
      if (res.data.success) {
        notie.alert('success','ser creo correctamente', 2);
        vm.getAll()
        vm.curso.numero_paralelo = ''
      } else {
        notie.alert('danger', 'hubo un error', 2)
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
    vm.file = '' //limpiar el archivo
  }
  vm.editar = function(curso) {
    accionEditar(curso)
    vm.tabla_acciones.editar = true
    vm.tabla_acciones.tabla = false
    vm.tabla_acciones.var = false
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
        notie.alert('success', 'se guardo profesor', 2)
        vm.getAll();
        vm.profesor_escogido = ''
        return
      }
      console.log(res.data)
    })
  }

  vm.addAlumno = function(id_alumno, id_curso) {
    if (!vm.alumno_escogido._id) return;
    Curso.addAlumno(vm.accionCurso._id,vm.alumno_escogido._id, (res) => {
      if (res.data.success) {
        notie.alert('success', 'se guardo profesor', 2)
        vm.getAll();
        vm.alumno_escogido = ''
        vm.accionCurso = res.data.curso
        return
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
        notie.alert('success', 'se borro el estudiante', 2);
        vm.getAll();
        actualizarAccionCursoBorrar(id_estudiante)
      } else {
        console.log(res.data)
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
        console.log(res.data);
        Curso.getById(vm.accionCurso._id, (res) => {
          if (res.data.success) {
            vm.accionCurso._estudiantes = res.data.curso._estudiantes
            //resetear todos los estudiantes de la pesana estudiantes
            $rootScope.getAllEstudiantes();
          }
        })
        notie.alert('success', 'creados correctamnet', 2)
      } else {
        console.log(res)
      }
    } )
  }
  
}
