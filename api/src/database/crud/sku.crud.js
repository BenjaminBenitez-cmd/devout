import db from "../connection";

const SKU = { values: {} };

SKU.values.createOne = (productid, skuid, optionid, valueid) => {
  return db.query(
    `
    INSERT INTO ProductSKUValues(ProductID, SKUID, OptionID, ValueID)
    VALUES($1, $2, $3, $4) returning*
    `,
    [productid, skuid, optionid, valueid]
  );
};

SKU.values.getOne = (productid, skuid, optionid) => {
  return db.query(
    `SELECT * FROM productSKUValues WHERE (ProductID = $1 AND SKUID = $2 AND OptionID = $3)`,
    [productid, skuid, optionid]
  );
};

SKU.values.getOneBySKUID = (id) => {
  return db.query(`SELECT * FROM productSKUValues WHERE SKUID = $1`, [id]);
};

SKU.values.getManyByProductID = (productid) => {
  return db.query(`SELECT * FROM ProductSKUValues WHERE ProductID = $1`, [
    productid,
  ]);
};

SKU.values.deleteOne = (skuid, productid) => {
  return db.query(
    `DELETE FROM ProductSKUValues WHERE SKUID = $1 AND ProductID = $3 returning*`,
    [skuid, productid]
  );
};

SKU.getManyByProductID = (productid) => {
  return db.query("SELECT * FROM ProductSKUS WHERE ProductID = $1", [
    productid,
  ]);
};

SKU.getOneBySKUID = (skuid) => {
  return db.query("SELECT * FROM ProductSKUS WHERE SKUID = $1", [skuid]);
};

SKU.createOne = (skucode, price, inventoryid, productid) => {
  return db.query(
    `
    INSERT INTO ProductSKUS (SKUName, Price, ProductInventoryID, ProductID) 
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

export const SKUCRUD = SKU;
