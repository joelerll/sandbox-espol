var mongoose = require('mongoose');

var dbURI = 'mongodb://localhost:27017:sandbox'
mongoose.connect(dbURI)

var db = mongoose.connection

db.on('connected', function() {
  console.log('base de datos conectada')
})

db.on('error', function(err) {
    console.log('Error en conectar mongo ' + err);
});
db.on('disconnected', function() {
    console.log('Mongo desconectado');
});

require('./profesor')
