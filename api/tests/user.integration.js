require("dotenv").config();
//import the assertion library
let chai = require("chai");
//import the chai http interface
let chaiHttp = require("chai-http");

chai.should();
chai.use(chaiHttp);

describe.skip("User integration tests", () => {
  let app = require("../src/index");
  const APIROUTE = "/api/v1/users";

  describe("Cart tests", () => {
    const data = {
      email: "john@testing.com",
      password: "password",
      token: null,
    };

    before("Sign in and get token", async () => {
      const response = await chai.request(app).post(data);
      data.token = "Bearer " + response.body.user.token;
    });

    it("should get a cart", async () => {
      const response = await chai
        .request(app)
        .set("Authorization", data.token)
        .get(`${APIROUTE}/cart`);
      response.should.have.status(200);
    });
  });
});
