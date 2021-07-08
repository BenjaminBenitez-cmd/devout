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

  /**
   * Test user authentication
   */
  //   describe("User routes", () => {
  //     const data = {
  //       email: Math.round(Math.random() * 100000) + "@email.com",
  //       password: "testpassword",
  //     };

  //     it("It should POST and signup a user", async () => {
  //       const data = {
  //         email: Math.round(Math.random() * 100000) + "@email.com",
  //         password: "testpassword",
  //       };
  //       const response = await chai
  //         .request(app)
  //         .post(`${APIROUTE}/user/signup`)
  //         .send(data);
  //       response.should.have.status(200);
  //       response.body.user.should.have.property("email");
  //     });

  //     it("It should POST and signin a user", async () => {
  //       const response = await chai
  //         .request(app)
  //         .post(`${APIROUTE}/user/signup`)
  //         .send(data);
  //       response.should.have.status(200);
  //       response.body.user.should.have.property("email");
  //     });
  //   });

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
