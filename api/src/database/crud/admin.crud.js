import db from "../connection";

const Admin = {};

Admin.createOne = (username, password, firstname, lastname) => {
  return db.query(
    `INSERT INTO AdminUsers(AdminUserName, AdminPassword, AdminFirstName, AdminLastName) 
     VALUES($1, $2, $3, $4) returning*
    `,
    [username, password, firstname, lastname]
  );
};

Admin.updateOne = (id, firstname, lastname) => {
  return db.query(
    `UPDATE AdminUsers SET AdminFirstName = $1, AdminLastName = $2 WHERE AdminID = $3 returning*`,
    [firstname, lastname, id]
  );
};

Admin.getOneByUserName = (username) => {
  return db.query(`SELECT * FROM AdminUsers WHERE AdminUserName = $1`, [
    username,
  ]);
};

Admin.getOneByID = (id) => {
  return db.query(`SELECT * FROM AdminUsers WHERE AdminID = $1`, [id]);
};

export const AdminCRUD = Admin;
