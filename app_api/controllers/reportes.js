var Estudiantes = require('../models/estudiante'),
Curso           = require('../models/curso'),
moment          = require('moment'),
asyn            = require("async"),
_               = require('lodash');

function cantidadEjerciciosDia(req, res, next) {
  let anio1 = req.query.anio1
  let anio2 = req.query.anio1
  let mes1 = req.query.mes1
  let mes2 = req.query.mes2
  let dia1 = req.query.dia1
  let dia2 = req.query.dia2
  let cantidad = 0
  let anio = 'YYYY'
  let mes = 'MM'
  let dia = 'DD'
  let hour = 'hh'
  let minutes = 'mm'
  let salida1 = 'MM-DD'
  let salida2 = 'YY-MM-DD'
  Estudiantes.getAllDetails((err, estudiantes) => {
    if (err) {
      console.log(err)
      res.status(400).json({messages: 'error', success: false})
      return;
    }
    let dias = []
    estudiantes.forEach((ejercicio) => {
      ejercicio._ejercicios.forEach((fecha) => {
        if (parseInt(anio1) <= (moment(fecha.fecha_resuelto).format(anio)) && parseInt(anio2) >= parseInt(moment(fecha.fecha_resuelto).format(anio))) {
          if (parseInt(mes1) <= parseInt(moment(fecha.fecha_resuelto).format(mes)) && parseInt(mes2) >= parseInt(moment(fecha.fecha_resuelto).format(mes))) {
              if (parseInt(dia1) <= parseInt(moment(fecha.fecha_resuelto).format(dia)) && parseInt(dia2) >= parseInt(moment(fecha.fecha_resuelto).format(dia))) {
                  let cont = 0
                  if(_.find(dias, {dia: moment(fecha.fecha_resuelto).format(salida2)})) {
                    dias.forEach((dia) => {
                      if (dia.dia == moment(fecha.fecha_resuelto).format(salida2)) {
                        dias[cont].cantidad = dia.cantidad + 1
                      }
                      cont = cont + 1
                    })
                  } else {
                    let sal = {
                      dia: moment(fecha.fecha_resuelto).format(salida2),
                      cantidad: 1
                    }
                    dias.push(sal)
                  }
              }
          }
        }
      })
    })
    res.status(200).json({messages: 'encontrado los ejercicios', success: true, dias: dias})
  })
}

function cantidadEjericiosPorCurso(req, res, next) {
  Curso.getAll((err, cursos) => {
    if (err) {
      res.status(400).json({success: false, message: 'ocurrio un error en el servidor'})
      return
    } else {
      var todos = []
      asyn.each(cursos,function(curso,callback) {
        Curso.populateCursoReporte(curso._id, (err, curso) => {
          console.log(curso);
          if (err) {
            callback(err)
          }
          var m = _.dropRightWhile(_.flatten(_.map(curso._estudiantes, '_ejercicios')), function(o) {return !o.resuelto;})
          var cant = m.length
          todos.push({curso: {numero_paralelo: curso.numero_paralelo, _id: curso._id}, cantidad: cant})
          console.log(cant);
          callback(null)
        })
      },function(err,data) {
        if (err) {
          res.status(200).json({success: false ,messages: 'error'})
        } else {
          res.status(200).json({cantidad: todos, messages: 'ejercicios resueltos por este curso', success: true})
        }
      });
    }
  })
}

module.exports = {
  cantidadEjericiosPorCurso: cantidadEjericiosPorCurso,
  cantidadEjerciciosDia: cantidadEjerciciosDia
}
