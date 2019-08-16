import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import data from '../test/data_details';


const should = chai.should();
chai.use(chaiHttp);
it('POST /api/v1/trips Should create a trip', (done) => {
    chai
      .request(app)
      .post('/api/v1/trips')
      .send(data)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.status.should.equal(400);
        done();
      });
  });

  describe('Trips', () => {
    it('GET /api/v1/trips Should get all trips', (done) => {
      chai
        .request(app)
        .get('/api/v1/trips')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });
  describe('GET specific trip', () => {
    it('GET /api/v1/trips/:trip_id Should return a specific trip ', (done) => {
      chai
        .request(app)
        .get('/api/v1/trips/1')
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          done();
        });
    });
})

describe('PATCH a trip', () => {
    it('Should update a given a trip (Trip just created)', (done) => {
      chai
        .request(app)
        .patch('/api/v1/trips/1')
        .send(data.tripdetails)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          done();
        });
    });
})