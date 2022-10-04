import db from "../connection";

const Product = {};

Product.createOne = (
  name,
  price,
  cartdescription,
  shortdescription,
  longdescription,
  discountID
) => {
  return db.query(
    `INSERT INTO Products(ProductName, ProductPrice, ProductCartDesc, ProductShortDesc, ProductLongDesc, ProductDiscountID) VALUES ($1, $2, $3, $4, $5, $6) returning*
    `,
    [
      name,
      price,
      cartdescription,
      shortdescription,
      longdescription,
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

Product.updateOne = (id, name, price, shortdescription, longdescription) => {
  return db.query(
    `UPDATE Products 
     SET ProductName = $1, 
      ProductPrice = $2, 
      ProductShortDesc = $3, 
      ProductLongDesc = $4
     WHERE ProductID = $5 
     returning*
     `,
    [name, price, shortdescription, longdescription, id]
  );
};

Product.removeOne = (id) => {
  return db.query("DELETE FROM Products WHERE ProductID = $1 returning*", [id]);
};

Product.getMany = () => {
  return db.query("SELECT * FROM Products");
};

Product.getOneByID = (id) => {
  return db.query("SELECT * FROM Products WHERE ProductID = $1", [id]);
};

export const ProductCRUD = Product;
