const db = require("../connection");

const Product = {};

Product.createOne = (
  name,
  price,
  cartdescription,
  shortdescription,
  longdescription,
  categoryID,
  discountID
) => {
  return db.query(
    `INSERT INTO Products(ProductName, ProductPrice, ProductCartDesc, ProductShortDesc, ProductLongDesc, ProductCategoryID, ProductDiscountID)
    VALUES ($1, $2, $3, $4, $5, $6, $7) returning*
    `,
    [
      name,
      price,
      cartdescription,
      shortdescription,
      longdescription,
      categoryID,
      discountID,
    ]
  );
};

Product.updateDiscount = (id, discountID) => {
  return db.query(
    `UPDATE Products SET ProductDiscountID = $1 WHERE ProductID = $2 returning*`,
    [discountID, id]
  );
};

Product.updateCategory = (id, categoryID) => {
  return db.query(
    `UPDATE Products SET ProductCategoryID = $1 WHERE ProductID = $2 returning*`,
    [categoryID, id]
  );
};

Product.updateOne = (
  id,
  name,
  price,
  cartdescription,
  shortdescription,
  longdescription,
  categoryID,
  discountID
) => {
  return db.query(
    `UPDATE Products 
     SET ProductName = $1, 
      ProductPrice = $2, 
      ProductCartDesc = $3, 
      ProductShortDesc = $4, 
      ProductLongDesc = $5, 
      ProductCategoryID = $6, 
      ProductDiscountID = $7 
     WHERE ProductID = $8 
     returning*
     `,
    [
      name,
      price,
      cartdescription,
      shortdescription,
      longdescription,
      categoryID,
      discountID,
      id,
    ]
  );
};

Product.removeOne = (id) => {
  return db.query("DELETE FROM Products WHERE ProductID = $1 returning*", [id]);
};

module.exports.ProductCRUD = Product;
