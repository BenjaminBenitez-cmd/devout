import db from "../connection";

const Image = {};

Image.createOne = (url, productID, SKUID) => {
  return db.query(
    `INSERT INTO ProductImages(ImageUrl, ProductID, SKUID) VALUES ($1, $2, $3) returning*`,
    [url, productID, SKUID]
  );
};

Image.getManyByProductAndSKU = (productid, skuid) => {
  return db.query(
    `SELECT ImageUrl, ImageID FROM ProductImages WHERE ProductID = $1 AND SKUID = $2`,
    [productid, skuid]
  );
};

Image.deleteOne = (id) => {
  return db.query(`DELETE FROM ProductImages WHERE ImageID=$1 returning*`, [
    id,
  ]);
};

export const ImageCRUD = Image;
