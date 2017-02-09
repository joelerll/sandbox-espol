var express = require('express');
var router = express.Router();
var request = require('request');
/* GET home page. */
router.get('/', function(req, res, next) {
  /*
  request({url: ' http://localhost:7000/api/v1/profesores', json: true}, function(err, res, json) {
  if (err) {
    throw err;
  }
  console.log(json);
});*/
  res.render('admin/login', { title: 'Express' });
});

/*
router.get('/administrador', function(req, res, next) {
  res.render('admin/index.html')
})*/

router.post('/login', function(req, res) {
  res.send('admin login')
})

module.exports = router;
