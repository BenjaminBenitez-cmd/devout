const { ErrorHandler } = require("./errors");
const { NOT_FOUND } = require("../constants/statuscodes");

/**
 *
 * @param { array } response the response from the database
 * @param { integer } statuscode the status code we want to return
 * @param { String } message the message we want to send
 * @returns { error } returns an error instance
 */

export const checkResults = (response, statuscode, message) => {
  if (response.rows[0] === undefined) {
    throw new ErrorHandler(
      statuscode || NOT_FOUND,
      message || "Resource not found"
    );
  }
};

/**
 *
 * @param { float } inventoryamount the amount in the database
 * @param { boolean } inventorylive the inventory status
 * @param { integer } productQuantity the quantity sent by the user
 * @returns
 */
export const checkIfAvailable = (
  inventoryamount,
  inventorylive,
  productQuantity
) => {
  let isValid = true;
  if (inventoryamount < productQuantity) {
    isValid = false;
  } else if (inventorylive === false) {
    isValid = false;
  }
  return isValid;
};
