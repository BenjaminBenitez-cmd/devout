require("dotenv").config();
const jwt = require("jsonwebtoken");

const newToken = (args) => {
  return jwt.sign(args, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES || "1h",
  });
};

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) return reject(err);
      resolve(payload);
    });
  });
};

module.exports.Tokens = {
  verifyToken,
  newToken,
};
