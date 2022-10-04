require("dotenv").config();
//import the assertion library
let chai = require("chai");
//import the chai http interface
let chaiHttp = require("chai-http");

chai.should();
chai.use(chaiHttp);

describe("Admin integration tests", () => {
  let app = require("../src/index");
  const APIROUTE = "/api/v1";

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
        skuid: 2,
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

  describe("Variant routes", () => {
    const data = {
      productid: 1,
      skuid: 2,
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

    it.skip("Should POST a variant", async () => {
      const response = await chai
        .request(app)
        .post(`${APIROUTE}/products/${data.productid}/variants`)
        .send(data);

      response.should.have.status(200);
      response.body.should.have.property("status");
      response.body.should.have.property("variant");
      response.body.variant.should.have.property("productid");
      response.body.variant.images.should.be.a("array");
    });

    it("Should NOT GET a variant without query string", async () => {
      const response = await chai
        .request(app)
        .get(`${APIROUTE}/products/${data.productid}/variants/${data.skuid}`);
      response.should.have.status(400);
    });

    it("Should GET a variant", async () => {
      const response = await chai
        .request(app)
        .get(
          `${APIROUTE}/products/${data.productid}/variants/${data.skuid}?optionid=${data.optionid}`
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

      const response = await chai
        .request(app)
        .patch(`${APIROUTE}/products/${data.productid}/variants/${data.skuid}`)
        .send(data);
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

      const response = await chai
        .request(app)
        .patch(`${APIROUTE}/products/${data.productid}/variants/${data.skuid}`)
        .send(data);
      response.should.have.status(201);
      response.body.variant.should.have.all.keys(
        "productid",
        "skuid",
        "updatedimages"
      );
      response.body.variant.updatedimages.should.be.a("array");
    });
  });

  /**Test  */

  describe("Option routes", () => {
    const data = {
      productid: 1,
      optionid: 1,
      optionname: "Height",
    };

    it.skip("It should POST an Option", async () => {
      const response = await chai
        .request(app)
        .post(`${APIROUTE}/products/${data.productid}/options`)
        .send({ name: optionname });

      response.should.have.status(200);
      response.body.option.should.have.all.keys("id", "name");
    });

    it("It should GET all options", async () => {
      const response = await chai
        .request(app)
        .get(`${APIROUTE}/products/${data.productid}/options`);

      response.should.have.status(200);
      response.body.should.have.property("options");
    });

    it.skip("It should DELETE options", async () => {
      const response = await chai
        .request(app)
        .delete(
          `${APIROUTE}/products/${data.productid}/options/${data.optionid}`
        );
      response.should.have.status(201);
    });
  });

  describe("It should get values", () => {
    const data = {
      productid: 1,
      optionid: 1,
      valueid: 1,
    };

    it("Should GET all values", async () => {
      const response = await chai
        .request(app)
        .get(
          `${APIROUTE}/products/${data.productid}/options/${data.optionid}/values`
        );
      response.should.have.status(200);
      response.body.values.should.be.a("array");
      response.body.values.should.have.lengthOf.above(2);
    });

    it("Should POST a value", async () => {
      const response = await chai
        .request(app)
        .post(
          `${APIROUTE}/products/${data.productid}/options/${data.optionid}/values`
        )
        .send({ name: "XSS" });
      response.should.have.status(200);
      response.body.value.should.have.all.keys("id", "name");
    });

    it.skip("Should DELETE a value", async () => {
      const response = await chai
        .request(app)
        .post(
          `${APIROUTE}/products/${data.productid}/options/${data.optionid}/values/${data.valueid}`
        )
        .send({ name: "XXS" });
      response.should.have.status(200);
      response.body.value.should.have.all.keys("id", "name");
    });
  });

  /** Test admin authentication methods */

  describe("Authentication routes", () => {
    const data = {
      username: Math.round(Math.random() * 100000) + "@email.com",
      password: "testpassword",
    };

    before("Create an admin so we can signin", async () => {
      await chai
        .request(app)
        .post(APIROUTE + "/admin/signup")
        .send(data);
    });

    it("It should POST and create an admin", async () => {
      const data = {
        username: Math.round(Math.random() * 100000) + "@email.com",
        password: "testpassword",
      };

      const response = await chai
        .request(app)
        .post(`${APIROUTE}/admin/signup`)
        .send(data);
      response.should.have.status(200);
      response.body.should.have.property("user");
      response.body.user.should.have.property("username");
    });

    it("It should POST and Signin an admin", async () => {
      const response = await chai
        .request(app)
        .post(`${APIROUTE}/admin/signin`)
        .send(data);
      response.should.have.status(200);
      response.body.token.should.have.lengthOf.above(10);
    });
  });
});
