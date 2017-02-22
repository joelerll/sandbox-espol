Estudiantes = require('../models/estudiante')
const moment = require('moment');
const _ = require('lodash')
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
  let salida2 = 'DD-hh'
  Estudiantes.getAllDetails((err, estudiantes) => {
    if (err) {
      console.log(err)
      res.status(400).json({messages: 'error', success: false})
      return;
    }
    let dias = []
    estudiantes.forEach((ejercicio) => {
      ejercicio._ejercicios.forEach((fecha) => {
        // console.log(moment(fecha.fecha_resuelto).format('MM DD hh'))
        if (parseInt(anio1) <= (moment(fecha.fecha_resuelto).format(mes)) && parseInt(anio2) >= parseInt(moment(fecha.fecha_resuelto).format(mes))) {
          // console.log(parseInt(mes1) <= parseInt(moment(fecha.fecha_resuelto).format('MM')))
          if (parseInt(mes1) <= parseInt(moment(fecha.fecha_resuelto).format(dia)) && parseInt(mes2) >= parseInt(moment(fecha.fecha_resuelto).format(dia))) {
              if (parseInt(dia1) <= parseInt(moment(fecha.fecha_resuelto).format(hour)) && parseInt(dia2) >= parseInt(moment(fecha.fecha_resuelto).format(hour))) {
                  let cont = 0
                    if(_.find(dias, {dia: moment(fecha.fecha_resuelto).format(salida2)})) {
                      console.log('existe')
                      dias.forEach((dia) => {
                        // console.log(dia.dia[moment(fecha.fecha_resuelto).format(salida2)]
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
                  //   if (dia.dia[moment(fecha.fecha_resuelto).format(salida2)] == undefined) {
                  //     dias.forEach((dia) => {
                  //       // console.log(dia.dia[moment(fecha.fecha_resuelto).format(salida2)]
                  //       if (dia.dia == moment(fecha.fecha_resuelto).format(salida2)) {
                  //         dias[cont].cantidad = dia.cantidad + 1
                  //       }
                  //       cont = cont + 1
                  //     })
                  //   }
                  // } catch (e) {
                  //   let sal = {
                  //     dia: moment(fecha.fecha_resuelto).format(salida2),
                  //     cantidad: 1
                  //   }
                  //
                  //   dias.push(sal)
                  //
                  // }
              }
          }
        }
      })
    })
    res.status(200).json({messages: 'encontrado los ejercicios', success: true, dias: dias})
  })
}

function cantidadEjericiosPorCurso(req, res, next) {
  res.send('curso')
}

module.exports = {
  cantidadEjericiosPorCurso: cantidadEjericiosPorCurso,
  cantidadEjerciciosDia: cantidadEjerciciosDia
}
