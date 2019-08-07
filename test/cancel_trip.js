const chai = require("chai");
const chaiHttp = require("chai-http");

require("../index");

const models = require("../models");
const base = require("./base");
const BASE_URL = "http://127.0.0.1:7000/api/v1";
const SIGNUP_URL = "/trips/:trip_id/cancel";

chai.use(chaiHttp);
chai.should();
describe.only("cancel_trip", () => {
  beforeEach(() => {
    models.users.length = 0;
  });

  describe("PATCH", () => {
    it("should update the trip ", done => {
      chai
        .request(BASE_URL)
        .post(SIGNUP_URL)
        .send(base.signup_user)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a("object");
          done();
        });
    });
  });
});
