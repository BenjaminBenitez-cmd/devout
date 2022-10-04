import db from "../connection";

const Discount = {};

Discount.getOne = (id) => {
  return db.query(`SELECT * FROM ProductDiscounts WHERE DiscountID = $1`, [id]);
};

Discount.getMany = () => {
  return db.query(`SELECT * FROM ProductDiscounts`);
};

Discount.createOne = (name, amount, quantity, startdate, expirydate) => {
  return db.query(
    `
    INSERT INTO ProductDiscounts(DiscountName, DiscountAmount, DiscountQuantity, DiscountStartDate, DiscountExpiryDate
    VALUES ($1, $2, $3, $4) returning`,
    [name, amount, quantity, startdate, expirydate]
  );
};

Discount.updateOne = (id, name, amount, quantity, startdate, expirydate) => {
  return db.query(
    `
        UPDATE ProductDiscounts
        SET 
        DiscountName = $1,
        DiscountAmount = $2, 
        DiscountQuantity = $3,
        DiscountStartDate = $4,
        DicsountExpiryDate = $5,
        WHERE DiscountID = $6
        returning*
    `,
    [id, name, amount, quantity, startdate, expirydate]
  );
};

Discount.removeOne = (id) => {
  return db.query(
    "DELETE FROM ProductDiscounts WHERE DiscountID = $1 returning*",
    [id]
  );
};

export const DiscountCRUD = Discount;
