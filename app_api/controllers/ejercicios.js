var mongoose         = require('mongoose'),
_                    = require('lodash'),
PythonShell          = require('python-shell'),
fs                   = require('fs'),
path                 = require('path'),
Ejercicio            = require('../models/ejercicio'),
EstudianteController = require('../controllers/estudiantes');

function create(req, res, next) {
    ejercicio = new Ejercicio ({
      titulo: req.body.titulo,
      descripcion: req.body.descripcion,
      entradas: req.body.entradas,
      salidas: req.body.salidas,
      etiquetas: req.body.etiquetas,
      dificultad: req.body.dificultad,
      creador: {
        _id: req.user._id,
        nombres: req.user.nombres,
        apellidos: req.user.apellidos,
        correo: req.user.correo,
        rol: req.user.rol
      }
    })
    ejercicio.create((err) => {
      if (err) {
        res.status(400).json({success: false, message: 'no se pudo crear el ejercicio'})
        return;
      }
      res.status(201).json({success: true, message: 'se creo correctamente el ejercicio', ejercicio: ejercicio})
    })
}

function getAllOfAll (req, res, next) {
  Ejercicio.getAll((err, ejercicios_todos) => {
    if (err) {
      res.send('erro');
      return;
    }
    res.json({ejercicios: ejercicios_todos, success: true})
  })
}

function getAllMisEjercicios (req, res ,next) {
  Ejercicio.getByCreador(req.user._id,(err, ejercicios_profesor) => {
    if (err) {
      res.send('hay un error');
      return;
    }
    res.json({ejercicios: ejercicios_profesor, success: true});
  })
}

function update (req, res, next) {
  console.log(req.body)
  Ejercicio.update(req.params.id,req.body, (err, ejercicio) => {
    if (err) {
      res.send('error')
      return;
    }
    res.status(200).json({message: 'ejercicio editado', success: true, ejercicio: ejercicio})
  })
}

function esCreador(req, res, next) {
  Ejercicio.esCreador(req.params.id, req.user._id, (esCreador) => {
    if (esCreador) {
      next();
      return;
    }
    res.send('no es creador')
  })
}

function del (req, res, next) {
  Ejercicio.delete(req.params.id, req.user._id, (err) => {
    if (err) {
      res.send('hubo algun error');
      return;
    }
    res.status(200).json({success: true, message: 'fue eliminado'});
  })
}

function getAllEtiquetas(req, res, next) {
  Ejercicio.getAllEtiquetas((err,etiquetas) => {
    if (err) {
      res.status(400).json({success: false, message: 'error al encontrar etiquetas'})
      return;
    }
    let array = []
    etiquetas.forEach((et)=> {
      array.push(et.etiquetas)
    })
    res.status(200).json({success: true, message: 'se encontraron las etiquetas', etiquetas: _.union( [].concat.apply([], array))})
  })
}

function getByEtiquetaYDificultad(req, res, next) {
  Ejercicio.getByEtiquetaYDificultad(req.query.etiqueta, req.query.dificultad,req.user._id, (err,err2, ejercicios) => {
    if (err || err2) {
      res.status(400).json({success: false, message: 'ocurrio un error en el servido'})
      return;
    }
    res.status(200).json({success: true, message: 'se encontraron los ejercicios', ejercicios: ejercicios})
  })
}

function comprobarEjercicio(req, res ,next) {
  if (!req.file) {
    res.status(200).json({message: 'archivo null'})
    return;
  }
  var carpeta = path.join(__dirname, '../../public/upload/ejercicios/');
  var archivo = req.user._id +'@'+ req.params.id_ejercicio + '.py';
  Ejercicio.getById(req.params.id_ejercicio, (err, ejercicio) => {
    if (err) {
      res.status(400).json({success: false, message: 'ejercicio no existe'})
      return;
    }
    var entradas = []
    ejercicio.entradas.forEach((dato) => {
      entradas.push(parseInt(dato))
    })
    var options = {
      mode: 'text',
      args: entradas,
      scriptPath: carpeta
    };
    fs.readFile( carpeta + archivo, function (err,data) {
      if (err) {
        res.status(400).json({success: false, message: 'error al leer archivo subido'})
        return;
      }
      PythonShell.run(archivo, options,function (err, results) {
        if (err) {
          res.status(200).json({success: false, message: 'el archivo python tiene los siguientes errores', errores: err})
          return;
        };
        var valido = probrarValidezEjercicio(results, ejercicio.salidas);
        if (valido) {
          var guardado = EstudianteController.registrarEjercicio('/upload/ejercicios/',archivo,ejercicio,req.user);
          res.status(200).json({success: true, message: 'resultado del ejercicio su es valido o no',resuelto: valido})
          return
        } else {
          var guardado = EstudianteController.registrarEjercicioMal('/upload/ejercicios/',archivo,ejercicio,req.user);
          res.status(200).json({success: true, message: 'resultado del ejercicio su es valido o no', resuelto: false})
        }
      })

    })
  })
}

function probrarValidezEjercicio(results, args) {
  console.log('orbar valides');
  console.log(args);
  console.log(results);
  if (!results) {
    return false
  }
  var cont = 0
  if (results.length != args.length) {
    return false
  }
  for (var i = 0; i < results.length; i++) {
    // console.log(results[i].toString());
    // var a = new String(results[i].toString())
    // var b = new String(args[i].toString())
    // console.log(a.valueOf() == b.valueOf())
    // console.log(a.valueOf() === b.valueOf());
    // console.log(args[i].toString());
    console.log(typeof results[i]);
    console.log(typeof args[i]);
    console.log(results[i].split(/\r/)[0]);
    console.log(args[i]);
    console.log(results[i].split(/\r/)[0] == args[i]);
    // console.log(results[i].toString().localeCompare(args[i].toString()));
    console.log('---------------------------');
    if (results[i].split(/\r/)[0] != args[i]) {
      return false
    }
  }
  return true;
}

function getOne(req, res, next) {
  Ejercicio.getOneByCreadorandId(req.user._id,req.params.id, (err, ejercicio) => {
    if (err) {
      res.status(400).json({message: 'hubo un error en server', success: false})
      return;
    }
    res.status(200).json({message: 'se encontro el ejercicio', success: true, ejercicio: ejercicio})
  })
}

module.exports = {
  getAllEtiquetas: getAllEtiquetas,
  create: create,
  getAllMisEjercicios: getAllMisEjercicios,
  getByEtiquetaYDificultad: getByEtiquetaYDificultad,
  del: del,
  update: update,
  getAllOfAll: getAllOfAll,
  esCreador: esCreador,
  comprobarEjercicio: comprobarEjercicio,
  getOne: getOne
}
