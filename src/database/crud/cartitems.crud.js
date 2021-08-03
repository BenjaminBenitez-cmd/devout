import db from "../connection";

const CartItem = {};

CartItem.getManyBySessionID = (sessionid) => {
  return db.query(`SELECT * FROM CartItem WHERE SessionID = $1`, [sessionid]);
};

CartItem.getOneByID = (cartid) => {
  return db.query(`SELECT * FROM CartItem WHERE CartID = $1`, [cartid]);
};

CartItem.createOne = (sessionid, productid, skuid, quantity) => {
  return db.query(
    `
        INSERT INTO CartItem (SessionID, ProductID, SKUID, Quantity)
        VALUES ($1, $2, $3, $4) returning*
    `,
    [sessionid, productid, skuid, quantity]
  );
};

CartItem.updateQuantity = (cartid, itemid, quantity) => {
  return db.query(
    `UPDATE CartItem SET Quantity = $1 WHERE CartID = $2 AND SessionID = $3`,
    [quantity, itemid, cartid]
  );
};

CartItem.removeOne = (sessionid, skuid) => {
  return db.query(
    `DELETE FROM CartItem WHERE SessionID = $1 AND SKUID = $2 returning*`,
    [sessionid, skuid]
  );
};

CartItem.removeAll = (sessionid) => {
  return db.query(`DELETE FROM CartItem WHERE SessionID = $1 returning*`, [
    sessionid,
    skuid,
  ]);
};

export const CartItemCRUD = CartItem;
