var mongoose = require('mongoose'),
config       = require('../config/main'),
console      = require('../config/utils');

mongoose.connect(config.mlab);

var db = mongoose.connection;

db.on('connected', function() {
  console.log('base de datos conectada');
})

db.on('error', function(err) {
    console.log('Error en conectar mongo ' + err);
});

db.on('disconnected', function() {
    console.log('Mongo desconectado');
});
