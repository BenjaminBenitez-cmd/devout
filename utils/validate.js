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

const checkIfAvailable = (inventoryamount, inventorylive, productQuantity) => {
  let isValid;
  if (inventoryamount < productQuantity) {
    isValid = false;
  } else if (inventorylive === false) {
    isValid = false;
  }

  return isValid;
};

module.exports = {
  checkResults,
  checkIfAvailable,
};
