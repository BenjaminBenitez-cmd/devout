import db from "../connection";

const Categories = {};

Categories.getMany = () => {
  return db.query("SELECT * FROM Categories");
};

Categories.getManyForProduct = (productid) => {
  return db.query(
    `SELECT * 
                  FROM ProductCategories AS PC
                  INNER JOIN Categories AS C
                  ON C.CategoryID = PC.CategoryID
                  WHERE PC.ProductID = $1
                    
  `,
    [productid]
  );
};

Categories.getOne = (id) => {
  return db.query(`SELECT * FROM ProductCategories WHERE ProductID = $1`, [id]);
};

Categories.createOne = (name) => {
  return db.query(
    "INSERT INTO Categories (CategoryName) VALUES ($1) returning*",
    [name]
  );
};

Categories.updateOne = (id, name) => {
  return db.query(
    "UPDATE Categories SET CategoryName = $1 WHERE CategoryID = $2 returning*",
    [name, id]
  );
};

Categories.removeOne = (id) => {
  return db.query("DELETE FROM Categories WHERE CategoryID = $1 returning*", [
    id,
  ]);
};

export const CategoriesCRUD = Categories;
