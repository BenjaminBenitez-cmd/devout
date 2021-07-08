import db from "../connection";

const ProductCategories = {};

ProductCategories.createOne = (productid, categoryid) => {
  return db.query(
    `INSERT INTO ProductCategories(ProductID, CategoryID) VALUES ($1, $2) returning*`,
    [productid, categoryid]
  );
};

ProductCategories.removeOne = (productid, categoryid) => {
  return db.query(
    `DELETE FROM ProductCategories WHERE ProductID = $1 AND CategoryID = $2 returning*`,
    [productid, categoryid]
  );
};

ProductCategories.getMany = (productid) => {
  return db.query(
    `
  SELECT C.CategoryID, C.CategoryName FROM ProductCategories AS PC INNER JOIN Categories AS C ON C.CategoryID = PC.CategoryID WHERE PC.ProductID = $1`,
    [productid]
  );
};

export const ProductCatCRUD = ProductCategories;
