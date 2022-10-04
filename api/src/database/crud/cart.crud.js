import db from "../connection";

const Cart = {};

Cart.createOne = (userid, cartquantity) => {
  return db.query(
    `INSERT INTO ShoppingSession(UserID, CartQuantity) VALUES($1, $2) returning*`,
    [userid, cartquantity]
  );
};

Cart.removeOne = (sessionid, userid) => {
  return db.query(
    `DELETE FROM ShoppingSession WHERE SessionID = $1 AND UserID = $2`,
    [sessionid, userid]
  );
};

Cart.getOneByUserID = (id) => {
  return db.query(`SELECT * FROM ShoppingSession WHERE UserID = $1`, [id]);
};

Cart.updateQuantity = (id, quantity) => {
  return db.query(
    "UPDATE ShoppingSession SET CartQuantity = $1 WHERE SessionID = $2 returing*",
    [id, quantity]
  );
};

export const CartCRUD = Cart;
