const chai = require('chai');
const chaiHttp = require('chai-http');

require('../index');
const models = require('../models');
const base = require('./base');
const BASE_URL = 'http://127.0.0.1:7000/api/v1';
const ALLTRIPS_URL = '/trips';

chai.use(chaiHttp);
chai.should();

describe.only('trips', () => {
  beforeEach(() => {
    models.trips.length = 0;
  });

  describe('GET', () => {

    it('should add a trip to the array', (done) => {
      chai.request(BASE_URL)
        .get(ALLTRIPS_URL)
        .send(base.ALLTRIPS_URL)
        .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            // res.body.status.should.have.property("error");
            // res.body.should.have.property('data');
            res.body.should.have.status('success');
            res.body.data.should.have.property('result');
            res.body.data.should.have.property('token');
            done();
        });
    });
});
});