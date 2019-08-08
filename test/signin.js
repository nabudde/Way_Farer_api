const chai = require('chai');
const chaiHttp = require('chai-http');

require('../index');

const models = require('../models');
const base = require('./base');
const BASE_URL = 'http://127.0.0.1:7000/api/v1';
const SIGNUP_URL= '/auth/signup';
const SIGNIN_URL = '/auth/signin';


chai.use(chaiHttp);
chai.should();
describe.only('signin', () => {
  beforeEach(() => {
    models.users.length = 0;
  });
  describe('signin Authentication ', () => {
       it('Should allow  signing in user', (done) => {
         chai.request(BASE_URL)
           .post(SIGNUP_URL)
           .send(base.signup_user)
           .end((error, res) => { 
             res.should.have.status(200);
             res.body.should.be.a('object');
             res.body.should.have.property('status');
             done();
           });  
          chai.request(BASE_URL)
            .post(SIGNIN_URL)
            .send(base.signin_user)
            .end((err, res) => {
                  res.should.have.status(200);             
                  res.body.should.have.a('object');
          });
      })
    it('should raise an error if email or password is missing', (done) => {
        chai.request(BASE_URL)
          .post(SIGNIN_URL)
          .send({ email: '', password: '' })
          .end((err, res) => {
            if (err) done();
            res.should.have.status(400);
            res.body.should.be.a('object');
            done();
          });
      chai.request(BASE_URL)
          .post(SIGNIN_URL)
          .send(base.signin_user1)
          .end((err, res) => {
            if (err) done();
            res.should.have.status(400);
            res.body.should.be.a('object');
          });
      chai.request(BASE_URL)
          .post(SIGNIN_URL)
          .send(base.signin_user1)
          .end((err, res) => {
            if (err) done();
            res.should.have.status(400);
            res.body.should.be.a('object');
          });
       });
      });
    });
          
    