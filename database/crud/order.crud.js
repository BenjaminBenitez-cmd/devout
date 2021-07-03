const db = require("../connection");

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

Orders.details.getMany = () => {
  return db.query("SELECT * FROM OrderDetails WHERE OrderDetailsID = $1");
};

Orders.details.removeOne = (orderdetailsid) => {
  return db.query("DELETE FROM OrderDetails WHERE OrderDetailsID = $1", [
    orderdetailsid,
  ]);
};

Orders.items.getManyByOrderDetailsID = (id) => {
  return db.query("SELECT * FROM OrderItems WHERE OrderDetailsID = $1", [id]);
};

Orders.items.getSalesByProductID = (id) => {
  return db.query(
    `
    SELECT COUNT(pd.paymentstatus) 
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
    ON OD.UserID = U.UserID;
  `);
};

Orders.getOne = () => {
  return db.query(`

  `);
};
Orders.createOne = () => {};
module.exports.OrderCRUD = Orders;
