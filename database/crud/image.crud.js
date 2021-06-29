const db = require("../connection");

const Image = {};

Image.createOne = (url, productID, SKUID) => {
  return db.query(
    `INSERT INTO ProductImages(ImageUrl, ProductID, SKUID) VALUES ($1, $2, $3)`,
    [url, productID, SKUID]
  );
};

Image.deleteOne = (id) => {
  return db.query(`DELETE FROM ProductImages WHERE ImageID=$1`, [id]);
};

module.exports.ImageCRUD = Image;
