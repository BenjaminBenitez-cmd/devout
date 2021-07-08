import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

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

const Tokens = {
  newToken,
  verifyToken,
};

export default Tokens;
