const chai = require('chai');
const chaiHttp = require('chai-http');

require('../index');

const models = require('../models');
const base = require('./base');
const BASE_URL = 'http://127.0.0.1:3000/api/v1';
const SIGNUP_URL = '/auth/signup';

chai.use(chaiHttp);
chai.should();

describe.only('user signup', () => {
  beforeEach(() => {
    models.users.length = 0;
  });

  describe('POST', () => {

    it('should add a user to the array', (done) => {
      chai.request(BASE_URL)
        .post(SIGNUP_URL)
        .send(base.signup_user)
        .end((err, res) => {
            res.should.have.status(201);
            res.body.should.be.a('object');
            res.body.should.have.property('status');
            res.body.should.have.property('data');
            res.body.data.should.have.property('result');
            done();
        });
    });
});
it('should raise an error when email is invalid', (done) => {
  chai.request(BASE_URL)
    .post(SIGNUP_URL)
    .send(base.signup_user_1)
    .end((err, res) => {
      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('status');
      res.body.should.have.property('error').eql('"email" is required');
      done();
    });
});
});
describe.only, ('email' ,(done) => {
it('should raise an error when email is repeated', (done) => {
  chai.request(BASE_URL)
    .post(SIGNUP_URL)
    .send(base.signup_user_1)
    .end((err, res) => {
      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('status');
      res.body.should.have.property('error').eql('"email" is required');
      done();
    });
});
})
