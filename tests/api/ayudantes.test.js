process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Profesor = require('../../app_api/models/profesor');
let supertest = require('supertest');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../app');
let should = chai.should();
chai.use(chaiHttp);

let token

describe('/POST authenticate admin', () => {
  it('Obtener json web token', (done) => {
    chai.request(server)
        .post('/api/v1/admin/login')
        .send({username: 'admin', password:'admin'})
        .end((err, res) => {
            token = res.body.token;
            res.should.have.status(200);
            res.body.should.have.property('success').to.be.true;
          done();
        });
  });
  /*
  it('Obtener jwt error pass incorrecto', (done) => {
    chai.request(server)
        .post('/api/v1/admin/login')
        .send({username: 'admin', password:'adminerror'})
        .end((err, res) => {
            res.should.have.status(401);
            res.body.should.have.property('message').eql('password incorrecto admin');
            res.body.should.have.property('success').to.be.false;
          done();
        });
  });
  it('Obtener jwt error admin no encontrado', (done) => {
    chai.request(server)
        .post('/api/v1/admin/login')
        .send({username: 'adminnoencontrado', password:'adminerror'})
        .end((err, res) => {
            res.should.have.status(404);
            res.body.should.have.property('message').eql('no encontrado admin');
            res.body.should.have.property('success').to.be.false;
          done();
        });
  });
  it('Datos en blanco', (done) => {
    chai.request(server)
        .post('/api/v1/admin/login')
        .send({username: '', password:''})
        .end((err, res) => {
            res.should.have.status(400);
          done();
        });
  });*/
})

// describe('Crear ayudante', () => {
//   it('/POST ayudante', (done) => {
//     chai.request(server)
//         .post('/api/v1/ayudantes')
//         .set('Authorization', token)
//         .send({identificacion: '0949846', nombres: 'JOel', apellidos: 'Rodriguez', correo: 'jel@gmail.com'})
//         .end((err, res) => {
//           res.should.have.status(201);
//           done();
//         })
//   })
// })
var ayudante = {};
describe('Obtener todos los Ayudantes API', () => {
  it('/GET todos los ayudantes', (done) => {
    chai.request(server)
      .get('/api/v1/ayudantes')
      .set('Authorization', token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('success').eql(true);
        res.body.should.have.property('ayudantes').lengthOf(1);
        ayudante = res.body.ayudantes[0];
        done();
      })
  })
})

describe('Editar un Ayudantes API', () => {
  it('/PUT un ayudante', (done) => {
    chai.request(server)
      .put('/api/v1/ayudantes/' + ayudante._id)
      .set('Authorization', token)
      .send({_id: ayudante._id,identificacion: '094', nombres: 'JOel', apellidos: 'Rodriguez', correo: 'jel@gmail.com'})
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('success').eql(true);
        res.body.should.have.property('message').eql('ayudante editado');
        console.log(res.body.ayudante)
        //res.body.should.have.property('ayudante').eql()
        done();
      })
  })
})

//
// describe('Borrar un Ayudantes API', () => {
//   it('/DELETE un ayudante', (done) => {
//     chai.request(server)
//       .delete('/api/v1/ayudantes/' + ayudante._id)
//       .set('Authorization', token)
//       .end((err, res) => {
//         res.should.have.status(200);
//         res.body.should.have.property('success').eql(true);
//         done();
//       })
//   })
// })
