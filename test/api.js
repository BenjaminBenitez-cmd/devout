require("dotenv").config();
//import the assertion library
let chai = require("chai");
//import the chai http interface
let chaiHttp = require("chai-http");

//import the database pool and connection
let { Pool } = require("pg");
let client = require("../database/connection");

chai.should();
chai.use(chaiHttp);

describe.skip("Users api", () => {
  let app;

  //Use the mocha before hook to stage connection with db
  before("Mock connection to the api", () => {
    const pool = new Pool({
      database: process.env.PGDATABASE,
      user: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      port: process.env.PGPORT,
      max: 1,
      idleTimeoutMillis: 0,
    });

    client.query = (text, params) => {
      return pool.query(text, params);
    };

    //Import server after initializing our connection
    app = require("../index");
  });

  //lets create a temporary table for testing
  beforeEach("Create temporary table", async () => {
    await client.query(
      "CREATE TEMPORARY TABLE Users (LIKE Users INCLUDING ALL)"
    );
  });

  beforeEach("show the items is the table", async () => {
    const results = await client.query(
      "INSERT INTO pg_temp.Users(UserEmail, UserPassword, UserFirstName, UserLastName) VALUES ('test@test.com', '534234k3', 'John', 'Doe') Returning*"
    );
  });

  afterEach("Drop temporary tables", async () => {
    await client.query("DROP TABLE IF EXISTS pg_temp.Users");
  });

  describe("GET /api/users:id", () => {
    it("it should GET User from ID", (done) => {
      const UserID = 1;
      chai
        .request(app)
        .get("/api/users/" + UserID)
        .end((err, response) => {
          response.should.have.status(200);
          response.should.have.header(
            "content-type",
            "application/json; charset=utf-8"
          );
          response.body.user.should.have.property("userfirstname");
          response.body.user.should.have.property("userfirstname");
          response.body.message.should.equal("success");
          done();
        });
    });
  });
});
