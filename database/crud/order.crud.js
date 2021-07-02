const db = require("../connection");

const Orders = { details: {}, items: {} };

Orders.details.createOne = () => {
  return db.query("", []);
};

Orders.details.updateOne = () => {
  return db.query("", []);
};

Orders.details.getMany = (id) => {
  return db.query("SELECT * FROM OrderDetails WHERE OrderDetailsID = $1", [id]);
};

Orders.details.removeOne = () => {
  return db.query("", []);
};

Orders.items.getManyByProductID = (id) => {
  return db.query("SELECT * FROM OrderItems WHERE ProductID = $1", [id]);
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

module.exports.OrderCRUD = Orders;
