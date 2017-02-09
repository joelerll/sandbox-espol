var fs = require('fs')
var jsonfile = require('jsonfile')
var profesores = []
var profesor = {}
for(var i = 0; i< 20; i++){
  profesores.push({
    correo : 'espol@profesor' + i,
    nombres : 'profesor' + i,
    apellidos : 'profesor' + i,
    clave : '1534654668' + i,
    rol : 'profesor',
    tipo_identificacion : '1213153' + i +' '+ i,
    creado : Date.now,
    editado : Date.now

  })

}
var profesores_archivo = './scripts/profesores.json'

jsonfile.writeFileSync(profesores_archivo, profesores)
