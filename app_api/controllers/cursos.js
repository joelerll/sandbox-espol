var Curso             = require('../models/curso'),
router                = require('express').Router(),
fs                    = require('fs'),
path                  = require('path'),
parse                 = require('csv-parse'),
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
  Curso.existeEnOtroCurso(req.params.id_estudiante, (err, curso) => {
    if (err) {
      res.status(400).json({message: 'error buscar para verificar', success: false})
      return
    } else if (!res){
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
                console.log(estudiante_curso)
                res.status(201).json({success: true, message: 'anadido estudiante', curso: estudiante_curso})
                return
              })
            }
          })
        }
      })
    } else {
      res.status(200).json({success: false, message: 'ya existe en otro curso'})
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
      res.status(400).json({message: 'no se pudo borrar', success: false})
      return;
    }
    res.status(200).json({message: 'se pudo borrar', success: true})
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

function estudiantesFile(req, res, next) {
  var input = path.join(__dirname, '../../public/upload/temp');
  fs.readFile(path.join(__dirname, '../../public/upload/temp/curso.csv'), 'utf8', function (err,data) {
    if (err) {
      res.status(400).json({message: 'ocurrio algun error al leer archivo', success: false})
      return
    }
    parse(data, function(err, output){
      var valido = comprobarParseCorrecto(output);
      if (!valido) {
        res.status(200).json({message: 'el formato no es valido', success: false})
        return;
      }
      var estudiantes = []
      var promesas = []
      for (var i = 1; i < output.length; i++) {
        let estudiante_nuevo = new Estudiante({
          identificacion: output[i][0],
          nombres: output[i][1],
          apellidos: output[i][2],
          correo: output[i][3],
          carrera: output[i][4]
        })
        promesas.push(new Promise((resolve, reject) => {
          //objener el correo del estudiante, si no existe crearlo
          Estudiante.getPorCorreo(estudiante_nuevo.correo, (err, est) => {
            if (err) {
              reject('error correo')
            }
            if (est) {
              Curso.existeEnOtroCurso(est._id, (err, res) => {
                if (err) {
                  reject('error si existe')
                  return
                }
                if (res) {
                  resolve('ya existe en otro curso')
                  return;
                } else {
                  Curso.addEstudianteById(req.params.id,est._id, (err, e) => {
                    if (err) {
                      reject('error inserds addId')
                    }
                    resolve('agregado a curso')
                  })
                }
              })
            } else {
              estudiante_nuevo.create(err => {
                if (err) {
                  reject('no vale crear')
                }
                Curso.addEstudianteById(req.params.id,estudiante_nuevo._id, (err, e) => {
                  if (err) {
                    reject('error inserds')
                  }
                  resolve('agregado a curso')
                })
              })
            }
          })
        })) //fin promise y funcion reject
      }
      Promise.all(promesas).then(values => {
        res.status(200).json({message: 'se creo el curso', success: true, info: values})
      }). catch(reason => {
        res.status(400).json({message: 'error', success: false, info: reason})
      })
    }); //fin parse
  }); //fin de archivo
}

function comprobarParseCorrecto(array) {
  for (var i = 0; i < array.length; i++) {

    if ((array[i][0] != 'identificacion' || array[i][1] != 'nombres' || array[i][2] != 'apellidos' || array[i][3] != 'correo' || array[i][4] != 'carrera') && i == 0) {
      return false
    }
    console.log(array[i][0])
    if (array[i][0] == '' || array[i][1] == '' || array[i][2] == '' || array[i][3] == '' || array[i][4] == '') {
      return false
    }
  }
  return true
}

function readById(req, res, next) {
  Curso.getByIdPopulate(req.params.id, (err, curso) => {
    if (err) {
      res.status(400).json({success: false, message: 'error'})
      return;
    }
    res.status(200).json({message: 'se encontro', success: true, curso: curso})
  })
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
  estudiantesFile: estudiantesFile,
  readById: readById
}
