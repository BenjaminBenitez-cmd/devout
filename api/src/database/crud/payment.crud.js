import db from "../connection";

const Payment = {};

Payment.getOneByID = (paymentid) => {
  return db.query("SELECT * FROM PaymentDetails WHERE PaymentID = $1", [
    paymentid,
  ]);
};

Payment.createOne = (amount, provider, status) => {
  return db.query(
    "INSERT INTO PaymentDetails(PaymentAmount, PaymentProvider, PaymentStatus) VALUES ($1, $2, $3) returning*",
    [amount, provider, status]
  );
};

Payment.updateOne = (id, amount, provider, status) => {
  return db.query(
    `
    UPDATE PaymentDetails 
    SET 
    PaymentAmount = $1,
    PaymentProvider = $2,
    PaymentStatus = $3
    WHERE PaymentID = $4
    returning*
    `,
    [amount, provider, status, id]
  );
};

Payment.updateStatus = (id, status) => {
  return db.query(
    `
    UPDATE PaymentDetails 
    SET 
    PaymentStatus = $1
    WHERE PaymentID = $2
    returning*
    `,
    [status, id]
  );
};

Payment.deleteOne = (id) => {
  return db.query(
    `
      DELETE FROM PaymentDetails
      WHERE PaymentID = $1
      returning*
    `,
    [amount, provider, status, id]
  );
};

export const PaymentCRUD = Payment;
