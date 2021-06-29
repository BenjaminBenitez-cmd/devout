const { ErrorHandler } = require("./errors");
const { NOT_FOUND } = require("../constants/statuscodes");

const checkResults = (response, statuscode, message) => {
  if (response.rows[0] === undefined) {
    throw new ErrorHandler(
      statuscode || NOT_FOUND,
      message || "Resource not found"
    );
  }
};

module.exports = checkResults;
