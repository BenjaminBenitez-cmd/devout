require("dotenv").config();
const chai = require("chai");
const chaihttp = require("chai-http");

const { Pool } = require("pg");
const client = require("../src/database/connection");
const {
  ProductCRUD,
  ImageCRUD,
  InventoryCRUD,
  SKUCRUD,
} = require("../src/database/crud");
const { AdminCRUD } = require("../src/database/crud/admin.crud");
chai.use(chaihttp);
chai.should();

describe.skip("Test the models", () => {
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
    await client.query(
      "CREATE TEMPORARY TABLE Products (Like Products INCLUDING ALL)"
    );
    await client.query(
      "CREATE TEMPORARY TABLE ProductImages (Like ProductImages INCLUDING ALL)"
    );
    await client.query(
      "CREATE TEMPORARY TABLE ProductInventory (Like ProductInventory INCLUDING ALL)"
    );
    await client.query(
      "CREATE TEMPORARY TABLE ProductSKUS (Like ProductSKUS INCLUDING ALL)"
    );
    await client.query(
      "CREATE TEMPORARY TABLE ProductSKUValues (Like ProductSKUValues INCLUDING ALL)"
    );
  });

  beforeEach("Create temporary table", async () => {
    await client.query(
      "INSERT INTO AdminUsers (AdminUserName, AdminPassword, AdminFirstName, AdminLastName) VALUES ('testadmin', 'password', 'John', 'Doe')"
    );
    await client.query(
      `INSERT INTO Products(ProductName, ProductPrice, ProductCartDesc, ProductShortDesc, ProductLongDesc, ProductCategoryID)
      VALUES ('Addidas Super Star', 125.00, 'The addidas super start is the best shoe', 'The best shoe in the world', 'The super start is an award winning shoe designed with comfort in mind', 1) `
    );
    await client.query(
      `INSERT INTO ProductImages(ImageUrl, ProductID, SKUID) VALUES ('http://testurl.com', 1, 1)`
    );
    await client.query(
      `INSERT INTO ProductInventory(InventoryQuantity, InventoryLive, InventoryUnlimited) VALUES (20.23, true, false)`
    );
    await client.query(
      `INSERT INTO ProductSKUS (SKUName, ProductID, Price, ProductInventoryID) VALUES ('AD-SM-RD', 1, 125.00, 1)`
    );
  });

  afterEach("Drop temporary tables", async () => {
    await client.query("DROP TABLE IF EXISTS pg_temp.AdminUsers");
    await client.query("DROP TABLE IF EXISTS pg_temp.Products");
    await client.query("DROP TABLE IF EXISTS pg_temp.ProductImages");
    await client.query("DROP TABLE IF EXISTS pg_temp.ProductInventory");
    await client.query("DROP TABLE IF EXISTS pg_temp.ProductSKUS");
    await client.query("DROP TABLE IF EXISTS pg_temp.ProductSKUValues");
  });

  describe("Admin Model Tests", () => {
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

  describe("Product Model Tests", () => {
    it("Should get a product", async () => {
      const product = await ProductCRUD.getMany();
      product.rows.should.be.a("array");
      product.rows[0].should.have.property("productname");
    });
    it("Should add a product", async () => {
      const productdata = {
        name: "Lebron James",
        price: 23.0,
        cartdescription: "Amazing",
        shortdescription: "Amazing shoes",
        longdescription: "Amazing shoes",
        categoryID: 1,
        discountID: 1,
      };
      const product = await ProductCRUD.createOne(
        productdata.name,
        productdata.price,
        productdata.cartdescription,
        productdata.longdescription,
        productdata.categoryID,
        productdata.discountID
      );
      product.rows.should.be.a("array");
      product.rows[0].should.have.property("productname").eq(productdata.name);
    });

    /**Product model tests */

    it("Should update a product", async () => {
      const productdata = {
        id: 1,
        name: "Lebron Soldier 11",
        price: 23.0,
        cartdescription: "Amazing sneakers",
        shortdescription: "Amazing shoes",
        longdescription: "Amazing shoes",
        categoryID: "1",
        discountID: "1",
      };
      const product = await ProductCRUD.updateOne(
        productdata.id,
        productdata.name,
        productdata.price,
        productdata.cartdescription,
        productdata.shortdescription,
        productdata.longdescription,
        productdata.categoryID,
        productdata.discountID
      );
      product.rows[0].should.be.a("object");
      product.rows[0].should.have
        .property("productcartdesc")
        .eq(productdata.cartdescription);
    });
  });

  /**Image model tests */

  describe("Image model", () => {
    const imagedata = {
      id: 1,
      url: "http://fakeurl.com",
      ProductID: 1,
      SKUID: 1,
    };
    it("Should create an image", async () => {
      const { rows } = await ImageCRUD.createOne(
        imagedata.url,
        imagedata.ProductID,
        imagedata.SKUID
      );
      rows[0].should.be.a("object");
      rows[0].should.have.property("imageurl");
    });
    it("Should delete image", async () => {
      const { rows } = await ImageCRUD.deleteOne(imagedata.id);
      rows[0].should.be.a("object");
      rows[0].should.have.property("imageurl");
    });
  });

  /**Inventory model tests */
  describe("Inventory model", () => {
    const inventorydata = {
      id: 1,
      quantity: 2,
      isLive: true,
      unlimited: false,
      updatedquantity: 5,
    };
    it("Should create an inventory", async () => {
      const { rows } = await InventoryCRUD.createOne(
        inventorydata.quantity,
        inventorydata.isLive,
        inventorydata.unlimited
      );
      rows[0].should.be.a("object");
      rows[0].should.have.property("inventoryquantity");
    });
    it("Should update an inventory", async () => {
      const { rows } = await InventoryCRUD.updateOne(
        inventorydata.id,
        inventorydata.updatedquantity,
        inventorydata.isLive,
        inventorydata.unlimited
      );
      rows[0].should.be.a("object");
      rows[0].should.have
        .property("inventoryquantity")
        .eq(inventorydata.updatedquantity);
    });
  });

  /**Inventory model tests */
  describe("SKU model", () => {
    const skudata = {
      id: 1,
      price: 200.0,
      skucode: "wt-pk-rd",
      inventoryid: 1,
      productid: 1,
      updatedskucode: "ft-bk-10",
    };
    it("Should create an sku", async () => {
      const { rows } = await SKUCRUD.createOne(
        skudata.skucode,
        skudata.price,
        skudata.inventoryid,
        skudata.productid
      );
      rows[0].should.be.a("object");
      rows[0].should.have.property("skuname");
    });
    it("Should update an sku", async () => {
      const { rows } = await SKUCRUD.updateOne(
        skudata.id,
        skudata.updatedskucode,
        skudata.price
      );
      rows[0].should.be.a("object");
      rows[0].should.have.property("skuname").eq(skudata.updatedskucode);
    });
  });

  describe("Product sku values models", () => {
    let data = {
      ProductID: 1,
      SKUID: 1,
      OptionID: 1,
      ValueID: 1,
    };
    it("It should create a product sku value", async () => {
      const { rows } = await SKUCRUD.values.createOne(
        data.ProductID,
        data.SKUID,
        data.OptionID,
        data.ValueID
      );
      rows[0].should.have.property("productid");
      rows[0].should.have.property("skuid");
    });
  });
});
