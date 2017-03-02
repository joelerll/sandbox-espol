angular.module('adminApp').service('Curso', CursosController);

CursosController.$inyect = ['$http','auth','Upload'];

function CursosController($http,auth,Upload) {
  var getById = function(id,cb) {
    $http({
      method: 'GET',
      url: `/api/v1/admin/cursos/${id}`,
      headers: {'Authorization': auth.getToken()}
    }).then(cb)
  }

  var getAll = function (cb) {
    $http({
      method: 'GET',
      url: '/api/v1/admin/cursos',
      headers: {'Authorization': auth.getToken()}
    }).then(cb)
  }

  var create = function (curso,cb) {
    $http({
      method: 'POST',
      url: '/api/v1/admin/cursos',
      data: curso,
      headers: {'Authorization': auth.getToken()}
    }).then(cb)
  }

  var upload = function(id_curso,file,cb) {
    Upload.upload({
      url: '/api/v1/admin/cursos/file/' + id_curso,
      headers: {'Authorization': auth.getToken()},
      data: {'curso': file}
    }).then(cb)
  }

  var del = function(curso_id, cb) {
    $http({
      method: 'DELETE',
      url: '/api/v1/admin/cursos/' + curso_id,
      headers: {'Authorization': auth.getToken()}
    }).then(cb)
  }

  var buscarProfesor = function(profesor) {
    return $http({
      method: 'GET',
      url: '/api/v1/admin/profesores',
      headers: {'Authorization': auth.getToken()},
      params: {like: profesor}
    }).then((res) =>{
      if (res.data.success) {
        var profez = []
        res.data.profesores.forEach(profesor => {
          profez.push({nombres: profesor.apellidos + ' ' + profesor.nombres, _id: profesor._id})
        })
        return profez
      }
      return false
    })
  }


  var buscarAlumno = function(alumno) {
    return $http({
      method: 'GET',
      url: '/api/v1/admin/estudiantes',
      headers: {'Authorization': auth.getToken()},
      params: {like: alumno}
    }).then((res) =>{
      if (res.data.success) {
        var alumnos = []
        res.data.estudiantes.forEach(alumno => {
          alumnos.push({nombres: alumno.apellidos + ' ' + alumno.nombres, _id: alumno._id})
        })
        return alumnos
      }
      return false
    })
  }

  var addProfesor = function(id_curso,id_profesor, cb) {
    $http({
      method: 'POST',
      url: `/api/v1/admin/cursos/profesores/${id_curso}/${id_profesor}`,
      headers: {'Authorization': auth.getToken()},
    }).then(cb)
  }

  var addAlumno = function(id_curso,id_alumno, cb) {
    $http({
      method: 'POST',
      url: `/api/v1/admin/cursos/estudiantes/${id_curso}/${id_alumno}`,
      headers: {'Authorization': auth.getToken()},
    }).then(cb)
  }

  var deleteEstudiante = function(id_curso,id_alumno,cb) {
    $http({
      method: 'DELETE',
      url: `/api/v1/admin/cursos/estudiantes/${id_curso}/${id_alumno}`,
      headers: {'Authorization': auth.getToken()},
    }).then(cb)
  }

  var deleteProfesor = function(id_curso,id_profesor,cb) {
    $http({
      method: 'DELETE',
      url: `/api/v1/admin/cursos/profesores/${id_curso}/${id_profesor}`,
      headers: {'Authorization': auth.getToken()},
    }).then(cb)
  }

  return {
    getAll: getAll,
    create: create,
    del: del,
    buscarProfesor: buscarProfesor,
    addProfesor: addProfesor,
    buscarAlumno: buscarAlumno,
    addAlumno: addAlumno,
    deleteEstudiante: deleteEstudiante,
    getById: getById,
    upload: upload,
    deleteProfesor:deleteProfesor
  }
}
