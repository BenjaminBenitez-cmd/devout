import db from "../connection";

const Options = { values: {} };

Options.values.getMany = (optionid) => {
  return db.query(`SELECT * FROM ProductOptionValues WHERE OptionID = $1`, [
    optionid,
  ]);
};

Options.values.getOne = (valueid) => {
  return db.query(`SELECT * FROM ProductOptionValues WHERE ValueID = $1`, [
    valueid,
  ]);
};

Options.values.createOne = (name, productid, optionid) => {
  return db.query(
    `
    INSERT INTO ProductOptionValues(ValueName, ProductID, OptionID) 
    VALUES ($1, $2, $3) returning*`,
    [name, productid, optionid]
  );
};

Options.values.updateOne = (id, name) => {
  return db.query(
    `
        UPDATE ProductOptionValues
        SET ValueName = $1
        WHERE ValueID = $2
        returning* 
    `,
    [name, id]
  );
};

Options.values.removeOne = (id) => {
  return db.query(
    "DELETE FROM ProductOptionValues WHERE ValueID = $1 returning*",
    [id]
  );
};

Options.getMany = (productid) => {
  return db.query(`SELECT * FROM ProductOptions WHERE ProductID = $1`, [
    productid,
  ]);
};

Options.getOne = (id) => {
  return db.query(`SELECT * FROM ProductOptions WHERE OptionID = $1`, [id]);
};

Options.createOne = (productID, name) => {
  return db.query(
    `
        INSERT INTO ProductOptions(ProductID, OptionName) 
        VALUES ($1, $2)
        returning*
    `,
    [productID, name]
  );
};

Options.updateOne = (id, name) => {
  return db.query(
    `
        UPDATE ProductOptions
        SET 
        OptionName = $1
        WHERE OptionID = $2
        returning*
    `,
    [name, id]
  );
};

Options.removeOne = (id) => {
  return db.query(`DELETE FROM ProductOptions WHERE OptionID = $1 returning*`, [
    id,
  ]);
};

export const ProductOptionsCRUD = Options;
