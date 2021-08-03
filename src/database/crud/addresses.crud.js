import db from "../connection";

const Address = {};

Address.createOne = (
  userid,
  city,
  state,
  phone,
  country,
  address1,
  address2
) => {
  return db.query(
    "INSERT INTO Addresses(UserID, AddressCity, AddressState, AddressPhone, AddressCountry, Address1, Address2) VALUES ($1, $2, $3, $4, $5, $6, $7 ) returning*",
    [userid, city, state, phone, country, address1, address2]
  );
};

Address.updateOne = (
  userid,
  city,
  state,
  phone,
  country,
  address1,
  address2
) => {
  return db.query(
    "UPDATE Addresses SET AddressCity = $1, AddressState = $2, AddressPhone = $3, AddressCountry = $4, Address1 = $5, Address2 = $6 WHERE UserID = $7",
    [city, state, phone, country, address1, address2, userid]
  );
};

Address.removeOneByUserID = (userid) => {
  return db.query("DELETE Addresses WHERE UserID = $1", [userid]);
};

Address.getOneByUserID = (userid) => {
  return db.query("SELECT * FROM Addresses WHERE UserID = $1", [userid]);
};

export const AddressCRUD = Address;
