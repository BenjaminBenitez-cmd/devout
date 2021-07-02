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

describe("Testing API", () => {
  let app = require("../index");
  const APIROUTE = "/api/admin";

  // //Use the mocha before hook to stage connection with db
  // before("Mock connection to the api", () => {
  //   const pool = new Pool({
  //     database: process.env.PGDATABASE,
  //     user: process.env.PGUSER,
  //     password: process.env.PGPASSWORD,
  //     port: process.env.PGPORT,
  //     max: 1,
  //     idleTimeoutMillis: 0,
  //   });

  //   client.query = (text, params) => {
  //     return pool.query(text, params);
  //   };

  //   //Import server after initializing our connection
  //   app = require("../index");
  // });

  describe("/api/admin/products", () => {
    const productdata = {
      skucode: "wt-10-r",
      name: "Nike AirMax 10",
      price: 40,
      cartdesc: "An awesome running shoe",
      shortdesc: "Nike running",
      longdesc: "The best sneaker",
      categoryid: 1,
      discountid: 1,
      images: ["http://nikeshoe.com"],
      amount: 3,
    };

    const urlroute = APIROUTE + "/products/";

    /**Tests for the products end point */
    it.skip("Should POST a product", async () => {
      try {
        const response = await chai
          .request(app)
          .post(urlroute)
          .set("content-type", "application/json")
          .send(productdata);
        response.body.product.should.be.a("object");
        response.body.product.should.have.all.keys(
          "id",
          "skuid",
          "name",
          "cartdescription",
          "longdescription",
          "shortdescription",
          "price",
          "amount",
          "islive",
          "images"
        );
        response.body.product.images.should.be.a("array");
        response.body.product.images.should.have.lengthOf(1);
        response.should.have.status(200);
      } catch (err) {
        throw new Error(err);
      }
    });

    it("Should GET all products", async () => {
      try {
        const response = await chai.request(app).get(urlroute);
        response.should.have.status(200);
        response.body.products.should.be.a("array");
        response.body.products[0].should.have.keys(
          "id",
          "name",
          "price",
          "cartdescription",
          "shortdescription",
          "longdescription",
          "categoryid",
          "discountid",
          "sales",
          "orders",
          "images"
        );
        response.body.products[0].images.should.be.a("array");
      } catch (err) {
        throw new Error(err);
      }
    });

    it("should GET a product by id", async () => {
      const productID = "1";

      const response = await chai.request(app).get(urlroute + productID);
      response.should.have.status(200);
      response.body.product.should.be.a("object");
      response.body.product.should.have.all.keys(
        "id",
        "name",
        "price",
        "cartdescription",
        "shortdescription",
        "longdescription",
        "categoryid",
        "discountid",
        "variants"
      );
      response.body.product.should.have.property("id").eq(productID);
      response.body.product.should.have.property("variants");
      response.body.product.variants.should.be.a("array");
      response.body.product.variants[0].should.have.property("images");
      response.body.product.variants[0].images.should.be.a("array");
    });

    it("should fail on GET with fake id", async () => {
      const productID = 122;
      const response = await chai.request(app).get(urlroute + productID);
      response.should.have.status(404);
      response.body.message.should.eq("Product could not be located");
    });

    it("Should PATCH a product", async () => {
      const data = {
        id: 1,
        skuid: 1,
        name: "Fear of God",
        price: 500.0,
        shortdescription: "An amazing white sneaker",
        longdescription: "Stand out from the rest with this awesome sneaker",
      };
      const response = await chai.request(app).patch(urlroute).send(data);
      response.should.have.status(201);
      response.body.product.should.have.all.keys("skuid", "id");
    });

    it("Should PATCH a product with images", async () => {
      const data = {
        id: 1,
        skuid: 1,
        name: "Fear of God",
        price: 500.0,
        shortdescription: "An amazing white sneaker",
        longdescription: "Stand out from the rest with this awesome sneaker",
        images: ["http://fakeimage.com/fake.jpg"],
      };
      const response = await chai.request(app).patch(urlroute).send(data);
      response.should.have.status(201);
      response.body.should.be.a("object");
      response.body.product.should.have.all.keys(
        "skuid",
        "id",
        "updatedimages"
      );
      response.body.product.updatedimages.should.be.a("array");
      // response.text.should.eq("Successfully updated product");
    });

    it("Should not PATCH a product", async () => {
      const data = {
        id: 1,
        skuid: 2,
        name: "Fear of God",
        price: 500.0,
        shortdescription: "An amazing white sneaker",
        longdescription: "Stand out from the rest with this awesome sneaker",
      };
      const response = await chai.request(app).patch(urlroute).send(data);
      response.should.have.status(500);
    });

    it.skip("Should DELETE a product", async () => {
      const productID = 1;
      const response = await chai.request(app).delete(urlroute + productID);
      response.should.have.status(201);
      response.text.should.eq("Successfully deleted product");
    });
  });

  /**
   * Testing Methods for variants
   */

  describe("Variant Models", () => {
    const data = {
      productid: 1,
      skucode: "PT-RB-HS",
      price: 20.0,
      amount: 3,
      images: [
        "https://fakeimage.com/fakeimage.jpg",
        "https://falseimage.com/fakeimage.jpg",
      ],
      optionid: "1",
      valueid: "1",
    };

    const urlroute = APIROUTE + "/products/variants";

    it.skip("Should POST a variant", async () => {
      const response = await chai.request(app).post(urlroute).send(data);

      response.should.have.status(200);
      response.body.should.have.property("status");
      response.body.should.have.property("variant");
      response.body.variant.should.have.property("productid");
      response.body.variant.images.should.be.a("array");
    });

    it("Should NOT GET a variant without query string", async () => {
      const response = await chai.request(app).get(`${urlroute}`);
      response.should.have.status(400);
    });

    it("Should GET a variant", async () => {
      const data = {
        productid: 1,
        skuid: 2,
        optionid: 1,
      };
      const response = await chai
        .request(app)
        .get(
          `${urlroute}?productid=${data.productid}&skuid=${data.skuid}&optionid=${data.optionid}`
        );

      response.should.have.status(200);
      response.body.variant.should.be.a("object");
      response.body.variant.should.have.all.keys(
        "skuid",
        "productid",
        "inventoryid",
        "valueid",
        "optionid",
        "skucode",
        "price",
        "amount",
        "islive",
        "images"
      );
    });

    it("Should PATCH a variant", async () => {
      const data = {
        productid: 1,
        skuid: 2,
        price: 300.0,
        amount: 4,
        skucode: "MN-GH-GJ",
      };

      const response = await chai.request(app).patch(urlroute).send(data);
      console.log(response.error);
      response.should.have.status(201);
      response.body.variant.should.have.any.keys(
        "productid",
        "skuid",
        "updatedimages"
      );
    });

    it("Should PATCH a variant WITH images", async () => {
      const data = {
        productid: 1,
        skuid: 2,
        price: 300.0,
        amount: 4,
        skucode: "MN-GH-GJ",
        images: ["http://fakeimage.com/test.jpg"],
      };

      const response = await chai.request(app).patch(urlroute).send(data);
      console.log(response.error);
      response.should.have.status(201);
      response.body.variant.should.have.all.keys(
        "productid",
        "skuid",
        "updatedimages"
      );
      response.body.variant.updatedimages.should.be.a("array");
    });
  });

  describe();
});
