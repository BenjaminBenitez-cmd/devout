const environment = process.env.NODE_ENV;

const config = (environment) => {
  switch (environment) {
    case "production":
      return {
        API_URL: process.env.REACT_APP_PRODUCTION_API,
        STRIPE_KEY: process.env.REACT_APP_STRIPE_API_KEY,
      };
    case "development":
      return {
        API_URL: process.env.REACT_APP_LOCAL_API,
        STRIPE_KEY: process.env.REACT_APP_STRIPE_API_KEY,
      };
    default:
      break;
  }
};

export default config(environment);
