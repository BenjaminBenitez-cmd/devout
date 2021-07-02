const db = require("../connection");

const Users = {};

Users.getOneByID = (id) => {
  return db.query(
    "SELECT UserID, UserEmail, UserFirstName, UserLastName, UserEmailVerified, UserVerificationCode FROM Users WHERE UserID = $1",
    [id]
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

module.exports.UsersCRUD = Users;
