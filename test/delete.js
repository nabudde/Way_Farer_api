const chai = require('chai');
const chaiHttp = require('chai-http');
const app=require ('../index');
require('./base');


const SIGNIN_URL = '/api/v1/auth/signin';
const SIGNUP_URL = '/api/v1/auth/signup';

chai.use(chaiHttp);
chai.should();

describe('Delete a booking', () => {
  it('should raise 201 when an advert is deleted', (done) => {
    chai.request(app)
      .post(SIGNUP_URL) 
      .send(base.signup_user_3)
      .end((err, res) => {
        if (err) done();
        chai.request(app)
          .post('/api/v1/trips') 
          .set('access-token', res.body.data.token)
          .send(base.booking_4)
          .end((error, res) => {
            if (error) done();
            chai.request(app)
              .post(SIGNIN_URL) 
              .send(base.signin_user_5)
              .end((errors, res) => {
                if (errors) done();
                chai.request(app)
                  .delete(`/api/v1/trips/${resp.body.data.id}`)
                  .set('access-token', response.body.data.token)
                  .end((errors2, response2) => {
                    if (errors2) done();
                    response2.should.have.status(202);
                    response2.body.should.be.a('object');
                    response2.body.should.have.property('data');
                    done();
                  });
              });
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
          .delete('/api/v1/bookings/1')
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
});