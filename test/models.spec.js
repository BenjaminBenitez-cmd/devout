require("dotenv").config();
const chai = require("chai");
const chaihttp = require("chai-http");

const { Pool } = require("pg");
const client = require("../database/connection");
const { AdminCRUD } = require("../database/crud/admin.crud");
chai.use(chaihttp);
chai.should();

describe("Test the models", () => {
  before("Mock connection to the database", () => {
    const pool = new Pool({
      database: process.env.PGDATABASE,
      user: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      port: process.env.PGPORT,
      max: 1,
      idleTimeoutMillis: 0,
    });

    client.query = (text, parameters) => {
      return pool.query(text, parameters);
    };
  });

  beforeEach("Create temporary table", async () => {
    await client.query(
      "CREATE TEMPORARY TABLE AdminUsers (Like AdminUsers INCLUDING ALL)"
    );
  });

  beforeEach("Create temporary table", async () => {
    await client.query(
      "INSERT INTO AdminUsers (AdminUserName, AdminPassword, AdminFirstName, AdminLastName) VALUES ('testadmin', 'password', 'John', 'Doe')"
    );
  });

  afterEach("Drop temporary tables", async () => {
    await client.query("DROP TABLE IF EXISTS pg_temp.AdminUsers");
  });

  describe("It should query the admin", () => {
    const userName = "testadmin";
    it("Should get an admin", async () => {
      const { rows } = await AdminCRUD.getOneByUserName(userName);
      rows[0].should.have.property("adminusername").eq(userName);
    });

    it("Should create an admin", async () => {
      const admin = {
        username: "Test",
        password: "fakepassword",
        firstname: "Jane",
        lastname: "Doe",
      };
      const { rows } = await AdminCRUD.createOne(
        admin.username,
        admin.password,
        admin.firstname,
        admin.lastname
      );
      rows[0].should.be.a("object");
      rows[0].should.have.property("adminusername", admin.username);
      rows[0].should.have.property("adminpassword", admin.password);
    });

    it("Should update an admin", async () => {
      const admin = {
        id: 1,
        firstname: "Tom",
        lastname: "Han",
      };
      const { rows } = await AdminCRUD.updateOne(
        admin.id,
        admin.firstname,
        admin.lastname
      );
      rows[0].should.have.property("adminfirstname", admin.firstname);
      rows[0].should.have.property("adminid", admin.id.toString());
      rows[0].should.have.property("adminlastname", admin.lastname);
    });
  });
});
