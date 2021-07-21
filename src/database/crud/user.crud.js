import db from "../connection";

const Users = {};

Users.getOneByID = (id) => {
  return db.query("SELECT * FROM Users WHERE UserID = $1", [id]);
};

Users.getOneByEmail = (email) => {
  return db.query(
    "SELECT * FROM Users WHERE UserEmail = $1 AND UserPassword IS NOT NULL",
    [email]
  );
};

Users.createOne = (email, firstname, lastname, password) => {
  return db.query(
    "INSERT INTO Users(UserEmail, UserFirstName, UserLastName, UserPassword) VALUES ($1, $2, $3, $4) returning*",
    [email, firstname, lastname, password]
  );
};

Users.updateOne = (
  id,
  firstname,
  lastname,
  emailverified,
  verificationcode
) => {
  return db.query(
    "UPDATE Users SET UserFirstName = $1, UserLastName = $2, UserEmailVerified = $3, UserVerificationCode = $4 WHERE UserID = $5 returning*",
    [firstname, lastname, emailverified, verificationcode, id]
  );
};

Users.updateVerificationStatus = (id, emailverified, verificationcode) => {
  return db.query(
    "UPDATE Users SET UserEmailVerified = $1, UserVerificationCode = $2 WHERE UserID = $3 returning*",
    [emailverified, verificationcode, id]
  );
};

export const UsersCRUD = Users;
