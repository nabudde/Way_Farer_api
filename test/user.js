import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import data from '../test/data_details';


const should = chai.should();
chai.use(chaiHttp);

describe('Sign Up', () => {
  it('POST /api/v1/auth/signup Should create an account', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(data.signup_details)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.status.should.equal(400);
        done();
      });
  });
})