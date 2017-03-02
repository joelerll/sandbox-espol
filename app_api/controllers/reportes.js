var Estudiantes = require('../models/estudiante'),
Ejercicio       = require('../models/ejercicio'),
Curso           = require('../models/curso'),
moment          = require('moment'),
asyn            = require("async"),
_               = require('lodash');

function cantidadEjerciciosDia(req, res, next) {
  let salida_formato = 'YY-MM-DD'
  //resta uno por un error de crear fechas no verificado
  var isodate1 = new Date(parseInt(req.query.anio1),parseInt(req.query.mes1)-1,parseInt(req.query.dia1)).toISOString();
  var isodate2 = new Date(parseInt(req.query.anio1),parseInt(req.query.mes2)-1,parseInt(req.query.dia2)).toISOString();
  Estudiantes.getAllDetails((err, estudiantes) => {
    if (err) {
      console.log(err)
      res.status(400).json({messages: 'error', success: false})
      return;
    }
    let dias = [];
    let cantidad = 0;
    estudiantes.forEach((ejercicio) => {
      ejercicio._ejercicios.forEach((fecha) => {
        var f_anio1 = parseInt(moment(fecha.fecha_resuelto).format('YYYY'))
        var f_mes1 = parseInt(moment(fecha.fecha_resuelto).format('MM'))
        var f_dia1 = parseInt(moment(fecha.fecha_resuelto).format('DD'))
        var fecha1 = new Date(f_anio1,f_mes1-1,f_dia1).toISOString();
        var isafter = moment(fecha1).isSameOrAfter(isodate1);
        var isBefore = moment(fecha1).isSameOrBefore(isodate2);
        if (isafter  && isBefore) {
          let cont = 0
          if(_.find(dias, {dia: moment(fecha.fecha_resuelto).format(salida_formato)})) {
            dias.forEach((dia) => {
              if (dia.dia == moment(fecha.fecha_resuelto).format(salida_formato)) {
                dias[cont].cantidad = dia.cantidad + 1
              }
              cont = cont + 1
            })
          } else {
            let sal = {
              dia: moment(fecha.fecha_resuelto).format(salida_formato),
              cantidad: 1
            }
            dias.push(sal)
          }
        }
      })
    })
    var dias_ordenado = dias.sort(function(a,b) {
      var f1 = a.dia.split('-')
      var f2 = b.dia.split('-')
      return moment(new Date(f1[0],f1[1],f1[2])).isSameOrAfter(moment(new Date(f2[0],f2[1],f2[2])))
    });
    res.status(200).json({messages: 'encontrado los ejercicios', success: true, dias: dias_ordenado});
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

function mejoresEstudiantesCurso(req, res, next) {
  var cursos_mejores = []
  Curso.CursosMejores((err, cursos) => {
    if (err) {
      res.send('error')
    } else {
      asyn.each(cursos, function(curso, cb) {
        if (err) {
          cb('error')
        }
        cursos_mejores.push({curso: {_id: curso._id, numero_paralelo: curso.numero_paralelo},estudiantes: _.remove(_.orderBy(curso._estudiantes,['puntaje'],['desc']).slice(0,3),function(n) {return n.puntaje != 0})})
        cb(null)
      }, function(error) {
        if (error) {
          res.send(error)
        }
        console.log('terminado');
        res.send(cursos_mejores)
      })
    }
  })
}
module.exports = {
  cantidadEjericiosPorCurso: cantidadEjericiosPorCurso,
  cantidadEjerciciosDia: cantidadEjerciciosDia,
  mejoresEstudiantesCurso: mejoresEstudiantesCurso
}
