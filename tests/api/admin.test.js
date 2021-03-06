process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Admin = require('../../app_api/models/admin');
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
  it('Obtener jwt error pass incorrecto', (done) => {
    chai.request(server)
        .post('/api/v1/admin/login')
        .send({username: 'admin', password:'adminerror'})
        .end((err, res) => {
            res.should.have.status(401);
            res.body.should.have.property('message').eql('password incorrecto');
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
            res.body.should.have.property('message').eql('user no existe');
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
  });
})

describe('/GET authenticate admin', () => {
  it ('prueba dashboard', (done) => {
    chai.request(server)
        .get('/api/v1/admin/dashboard')
        .set('Authorization', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('message').eql('dashboard');
          done();
        })
  })
})
