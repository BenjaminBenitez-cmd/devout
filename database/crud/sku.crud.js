const db = require("../connection");

const SKU = {};

SKU.values.createOne = (productid, skuid, optionid, valueid) => {
  return db.query(
    `
    INSERT INTO ProductSKUValues(ProductID, SKUID, OptionID, ValueID)
    VALUES($1, $2, $3, $4) returning*
    `,
    [productid, skuid, optionid, valueid]
  );
};

SKU.values.getMany = (productid) => {
  return db.query(`SELECT * FROM ProductSKUValues WHERE SKUID = $1`, [
    productid,
  ]);
};

SKU.values.deleteOne = (skuid, productid) => {
  return db.query(
    `DELETE FROM ProductSKUValues WHERE SKUID = $1 AND ProductID = $3 returning*`
  );
};

SKU.getOne = (productid) => {
  return db.query("SELECT * FROM ProductSKUS WHERE ProductID = $1", [
    productid,
  ]);
};

SKU.getMany = (productid) => {
  return db.query("SELECT * FROM ProductSKUS WHERE ProductID = $1", [
    productid,
  ]);
};

SKU.createOne = (skucode, price, inventoryid, productid) => {
  return db.query(
    `
    INSERT INTO ProductSKUS (SKUName, ProductID, Price, ProductInventoryID) 
    VALUES ($1, $2, $3, $4) returning*
    `,
    [skucode, price, inventoryid, productid]
  );
};

SKU.updateOne = (id, skucode, price) => {
  return db.query(
    `
            UPDATE ProductSKUS
            SET 
            SKUName = $1, 
            Price = $2
            WHERE SKUID = $3
            returning*
        `,
    [skucode, price, id]
  );
};

SKU.removeOne = (id) => {
  return db.query(`DELETE FROM ProductSKUS WHERE SKUID = $1 returning*`, [id]);
};

module.exports.SKUCRUD = SKU;
