const chai = require('chai');
const chaiHttp = require('chai-http');

require('../index');

const models = require('../models');
const base = require('./base');
const BASE_URL = 'http://127.0.0.1:7000/api/v1';
const SIGNIN_URL = '/auth/signin';

chai.use(chaiHttp);
chai.should();
describe.only('signin', () => {
    beforeEach(() => {
      models.users.length = 0;
    })
    describe('POST', () => {
        it('should add a user to the array', (done) => {
            chai.request(BASE_URL)
              .post(SIGNIN_URL)
              .send(base.signin_user)
              .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.have.a('object');
                    done();

            });
        });
    });
});
