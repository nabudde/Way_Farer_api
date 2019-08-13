const chai = require('chai');
const chaiHttp = require('chai-http');

require('../index');
const models = require('../models');
const base = require('./base');
const BASE_URL = 'http://127.0.0.1:3000/api/v1';
const SIGNUP_URL= 'auth/signup'
const TRIPS_URL = '/trips';
const SIGNIN_URL= 'auth/signin';


chai.use(chaiHttp);
chai.should();

    describe.only('trips', () => {
      before(() => {
        models.trips.length = 0;
      });
      describe('POST', () => {
        it('should add a trip to the array',() => {
          chai.request(BASE_URL)
            .post(SIGNUP_URL)
            .send(base.sign_user)
            .end() 
        });
        describe('POST', () => {
            it('should create a new trip', (done) => {
              chai.request(BASE_URL)
                .post(SIGNIN_URL)
                .send(base.signin_user_1)
                .end((err, res) => {
                  chai.request(BASE_URL)
                    .post('/trips')
                    .send(base.user_1)
                    .end((err, resp) => {
                      res.body.should.be.a('object');
                      done();
                    });
                });
            });
            it('should return only available trips in an array', (done) => {
                chai.request(BASE_URL)
                  .get('/trips')
                  .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status');
                    done();
                  });
              });
    });
});
})
it('should raise 400 if empty field is not provided', (done) => {
  chai.request(BASE_URL)
    .post(SIGNIN_URL)
    .send(base.SIGNin_user_1)
    .end((err, res) => {
      if (err) done();
      chai.request(app)
        .post('/api/v1/trips')
        .set('access-token', res.body.data.token)
        .send({})
        .end((error, resp) => {
          if (error) done();
          resp.should.have.status(400);
          resp.body.should.be.a('object');
          resp.body.should.have.property('status');
          resp.body.should.have.property('error');
          done();
        });
    });
});
it('should raise 404 when advert doesnt exist', (done) => {
  chai.request(app)
    .post(SIGNIN_URL) 
    .send(base.signin_user_10)
    .end((errors, res) => {
      if (errors) done();
      chai.request(app)
        .delete('/api/v1/property/10000')
        .set('access-token', res.body.data.token)
        .end((errors2, response) => {
          if (errors2) done();
          response.should.have.status(404);
          response.body.should.be.a('object');
          response.body.should.have.property('error');
          done();
        });
    });
});
