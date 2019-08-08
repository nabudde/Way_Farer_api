const chai = require('chai');
const chaiHttp = require('chai-http');

require('../index');
const models = require('../models');
const base = require('./base');
const BASE_URL = 'http://127.0.0.1:7000/api/v1';
const SIGNUP_URL= 'auth/signup'
const TRIPS_URL = '/trips';

chai.use(chaiHttp);
chai.should();

describe.only('trips', () => {
  beforeEach(() => {
    models.trips.length = 0;
  });
  describe('create trips Authentication ', () => {
    it('Should allow  signed  up user create a trip', (done) => {
      chai.request(BASE_URL)
        .post(SIGNUP_URL)
        .send(base.signup_user)
        .end((error, res) => { 
          res.should.have.status(404);
          res.body.should.be.a('object');
          // res.body.should.have.property('status');
          done();
        });  
        chai.request(BASE_URL)
            .post(TRIPS_URL)
            .send(base.trips_user)
            .end((err, res) => {
                  res.should.have.status(400);             
                  res.body.should.have.a('object');
          });

  })
})
})