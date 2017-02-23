var Curso              = require('../models/curso'),
 router                = require('express').Router(),
 Profesor              = require('../models/profesor'),
 Estudiante            = require('../models/estudiante'),
 EstudiantesController = require('../controllers/estudiantes');

function read(req, res, next) {
  Curso.getAll((err, cursos) => {
    if (err) {
      res.status(400).json({success: false, message: 'hubo un error al encontrar cursos'})
    }
    res.status(200).json({success: true, message: 'se encontraron lo cursos', cursos: cursos})
  })
}

function create(req, res, next) {
  let curso = new Curso({
    numero_paralelo: req.body.numero_paralelo
  })
  curso.create((err) => {
    if (err) {
      res.status(400).json({success: false, message: 'no se pudo  crear curso'})
      return;
    } else {
      Curso.getById(curso._id, (err, curso) => {
        if (err) {
          res.status(400).json({success: false, message: 'no se pudo encontrar lo creado'})
          return;
        }
        res.status(201).json({success:true, message: 'se creo correctamente', curso: curso})
      })
    }
  })
}

function addProfesor(req, res, next) {
  Profesor.getProfesorById(req.params.id_profesor, (err, profesor) => {
    if (err) {
      res.status(400).json({success: false, message: 'profesor no encontrado'})
      return;
    } else {
      Curso.addProfesorById(req.params.id_curso, req.params.id_profesor, (err, curso) => {
        if (err) {
          console.log(err)
          res.status(400).json({success: false, message: 'no anadido profesor error'})
          return;
        } else {
          Curso.populateCurso(req.params.id_curso, (err, profesor_curso) => {
            if (err) {
              res.status(400).json({success: false, message: 'no anadido profesor error'})
              return;
            }
            res.status(201).json({success: true, message: 'anadido profesor', curso: profesor_curso})
            return
          })
        }
      })
    }
  })
}

function addEstudiante(req, res, next) {
  Estudiante.getById(req.params.id_estudiante, (err, estudiante) => {
    if (err) {
      res.status(400).json({success: false, message: 'estudiante no encontrado'})
      return;
    } else {
      Curso.addEstudianteById(req.params.id_curso, req.params.id_estudiante, (err, curso) => {
        if (err) {
          console.log(err)
          res.status(400).json({success: false, message: 'no anadido estudiante error'})
          return;
        } else {
          Curso.populateCurso(req.params.id_curso, (err, estudiante_curso) => {
            if (err) {
              res.status(400).json({success: false, message: 'no anadido estudiante error'})
              return;
            }
            res.status(201).json({success: true, message: 'anadido estudiante', curso: estudiante_curso})
            return
          })
        }
      })
    }
  })
}

function del(req, res, next) {
  Curso.delete(req.params.id, (err) => {
    if (err) {
      res.status(400).json({success: false, message: 'no se pudo borrar'})
      return;
    }
    res.status(200).json({success: true, message: 'borrado exitosamente'})
  })
}

function update(req, res, next) {
  Curso.update(req.params.id, req.body, (err, paralelo) => {
    if (err) {
        res.status(400).json({success: false, message: 'no se pudo editar'})
        return;
    } else {
      Curso.getById(req.params.id, (err, curso) => {
        if (err) {
          res.status(400).json({success: false, message: 'no se pudo encontrar el creado'})
          return;
        }
        res.status(200).json({success: true, message: 'editado exitosamente', curso: curso})
        return;
      })
    }
  })
}

function deleteEstudiante(req, res, next) {
  Curso.deleteEstudiante(req.params.id_curso, req.params.id_estudiante, (err) => {
    if (err) {
      res.send('no borado')
      return;
    }
    res.send('borrado')
  })
}

function deleteProfesor(req, res, next) {
  Curso.deleteProfesor(req.params.id_curso, req.params.id_profesor, (err) => {
    if (err) {
      console.log(err)
      res.send('no borado')
      return;
    }
    res.send('borrado')
  })
}

const fs = require('fs');
const path = require('path');
var parse  = require('csv-parse');
function estudiantesFile(req, res, next) {
  var input = path.join(__dirname, '../../public/upload/temp');
  fs.readFile(path.join(__dirname, '../../public/upload/temp/curso.csv'), 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  parse(data, function(err, output){
    var estudiantes = EstudiantesController.saveEstudiantesArray(output)
    if (err) {
      res.status(400).json({success: false, message: 'hubo un error en parsear csv'})
      return;
    }
    res.status(200).json({success: true, message: 'enviado correctamente', estudiantes: estudiantes})
  });
});
}

module.exports = {
  read: read,
  create: create,
  addProfesor: addProfesor,
  addEstudiante: addEstudiante,
  del: del,
  update: update,
  deleteEstudiante: deleteEstudiante,
  deleteProfesor: deleteProfesor,
  estudiantesFile: estudiantesFile
}
