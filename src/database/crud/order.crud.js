import db from "../connection";

const Orders = { details: {}, items: {} };

Orders.details.createOne = (userid, total, paymentid) => {
  return db.query(
    "INSERT INTO OrderDetails(UserID, OrderDetailTotal, OrderDetailPaymentID) VALUES ($1, $2, $3) returning*",
    [userid, total, paymentid]
  );
};

Orders.details.getManyByUserID = (userid) => {
  return db.query("SELECT * FROM OrderDetails WHERE UserID = $1", [userid]);
};

Orders.details.getOne = (orderdetailsid) => {
  return db.query("SELECT * FROM OrderDetails WHERE OrderDetailsID = $1", [
    orderdetailsid,
  ]);
};

Orders.details.removeOne = (orderdetailsid) => {
  return db.query("DELETE FROM OrderDetails WHERE OrderDetailsID = $1", [
    orderdetailsid,
  ]);
};

Orders.items.createOne = (detailsid, productid, skuid, quantity) => {
  return db.query(
    "INSERT INTO OrderItems (OrderDetailsID, ProductID, SKUID, OrderQuantity) VALUES ($1, $2, $3, $4) returning*",
    [detailsid, productid, skuid, quantity]
  );
};

Orders.items.getManyByProductID = (id) => {
  return db.query("SELECT * FROM OrderItems WHERE ProductID = $1", [id]);
};

Orders.items.getManyByOrderDetailsID = (id) => {
  return db.query("SELECT * FROM OrderItems WHERE OrderDetailsID = $1", [id]);
};

Orders.items.getSalesByProductID = (id) => {
  return db.query(
    `
    SELECT *
    FROM OrderItems AS oi 
    INNER JOIN OrderDetails AS od
    ON oi.OrderDetailsID = od.OrderDetailsID
    INNER JOIN PaymentDetails as pd
    ON pd.PaymentID = od.OrderDetailPaymentID AND pd.paymentstatus = 'Fullfilled'
    WHERE oi.ProductID = $1
  `,
    [id]
  );
};

Orders.getMany = () => {
  return db.query(`
    SELECT OD.OrderDetailsID, U.UserEmail, OD.OrderDetailTotal, PD.PaymentStatus, PD.PaymentID
    FROM OrderDetails AS OD
    INNER JOIN PaymentDetails AS PD
    ON OD.OrderDetailPaymentID = PD.PaymentID
    INNER JOIN Users AS U
    ON OD.UserID = U.UserID
  `);
};

Orders.getManyByUserID = (userid) => {
  return db.query(
    `
    SELECT OD.OrderDetailsID, OD.OrderDetailTotal, PD.PaymentAmount, PD.PaymentStatus FROM OrderDetails AS OD
    INNER JOIN PaymentDetails AS PD
    ON PD.PaymentID = OD.OrderDetailPaymentID
    WHERE OD.UserID = $1 AND NOT PD.PaymentStatus = 'initialized' 
  `,
    [userid]
  );
};

Orders.createOne = (userid, total, paymentid) => {
  return db.query(
    `
    INSERT INTO OrderDetails (UserID, OrderDetailTotal, OrderDetailPaymentID)
    VALUES ($1, $2, $3) returning*;
  `,
    [userid, total, paymentid]
  );
};

export const OrderCRUD = Orders;
