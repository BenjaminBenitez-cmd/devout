import dotenv from "dotenv";
dotenv.config();

const state = process.env.NODE_ENV;

const config = (state) => {
  switch (state) {
    case "development":
      return {
        PGDATABASE: process.env.PGDATABASE,
        PGPORT: process.env.PGPORT,
        PGUSER: process.env.PGUSER,
        PGHOST: process.env.PGHOST,
        PGPASSWORD: process.env.PGPASSWORD,
        JWT_EXPIRY: process.env.JWT_EXPIRY,
        JWT_SECRET: process.env.JWT_SECRET,
        STRIPE_KEY: process.env.STRIPE_KEY,
        SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
        SENDER_EMAIL: process.env.SENDER_EMAIL,
        CLIENT_URL: process.env.CLIENT_URL,
      };
    case "production":
      return {
        PGCONNECTION: process.env.DATABASE_URL,
        JWT_EXPIRY: process.env.JWT_EXPIRY,
        JWT_SECRET: process.env.JWT_SECRET,
        STRIPE_KEY: process.env.STRIPE_KEY,
        SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
        SENDER_EMAIL: process.env.SENDER_EMAIL,
        CLIENT_URL: process.env.CLIENT_URL,
      };
    default:
      return;
  }
};

export default config(state);
