const environment = process.env.NODE_ENV;

const config = (environment) => {
  switch (environment) {
    case "production":
      return {
        API_URL: process.env.REACT_APP_PRODUCTION_API,
      };
    case "development":
      return {
        API_URL: process.env.REACT_APP_LOCAL_API,
      };
    default:
      break;
  }
};

export default config(environment);
