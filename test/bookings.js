import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import data from '../test/data_details';

const should = chai.should();
chai.use(chaiHttp);

describe('POST bookings ', () => {
    it('Should not create a new booking object (No token)', (done) => {
      chai
        .request(app)
        .post('/api/v1/bookings')
        .send(data.trips_details)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.status.should.equal(400);
          done();
        });
    });
})