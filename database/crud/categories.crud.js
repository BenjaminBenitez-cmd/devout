const db = require("../../database/connection");

const Categories = {};

Categories.getMany = () => {
  return db.query("SELECT * FROM ProductCategories");
};

Categories.getOne = (id) => {
  return db.query(`SELECT * FROM ProductCategories WHERE ProductID = $1`, [id]);
};

Categories.createOne = (name) => {
  return db.query(
    "INSERT INTO ProductCategories(CategoryName) VALUES ($1) returning*",
    [name]
  );
};

Categories.removeOne = (id) => {
  return db.query("DELETE FROM ProductCategories WHERE CategoryID = $1", [id]);
};

module.exports.CategoriesCRUD = Categories;
