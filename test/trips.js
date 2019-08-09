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
