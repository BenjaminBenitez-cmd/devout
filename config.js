require("dotenv").config();

const state = process.env.NODE_ENV;

const config = (state) => {
  switch (state) {
    case "development":
      return {
        PGUSER: process.env.PGDATABASE,
        PGPORT: process.env.PGPORT,
        PGUSER: process.env.PGUSER,
        PGPASSWORD: process.env.PGPASSWORD,
        JWT_EXPIRY: process.env.JWT_EXPIRY,
        JWT_SECRET: process.env.JWT_SECRET,
      };
    case "production":
      return {
        PGCONNECTION: process.env.DATABASE_URL,
        JWT_EXPIRY: process.env.JWT_EXPIRY,
        JWT_SECRET: process.env.JWT_SECRET,
      };
    default:
      break;
  }
};

config(state);

module.exports = config(state);
