"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkIfAvailable = exports.checkResults = void 0;

var _require = require("./errors"),
    ErrorHandler = _require.ErrorHandler;

var _require2 = require("../constants/statuscodes"),
    NOT_FOUND = _require2.NOT_FOUND;
/**
 *
 * @param { array } response the response from the database
 * @param { integer } statuscode the status code we want to return
 * @param { String } message the message we want to send
 * @returns { error } returns an error instance
 */


var checkResults = function checkResults(response, statuscode, message) {
  if (response.rows[0] === undefined) {
    throw new ErrorHandler(statuscode || NOT_FOUND, message || "Resource not found");
  }
};
/**
 *
 * @param { float } inventoryamount the amount in the database
 * @param { boolean } inventorylive the inventory status
 * @param { integer } productQuantity the quantity sent by the user
 * @returns
 */


exports.checkResults = checkResults;

var checkIfAvailable = function checkIfAvailable(inventoryamount, inventorylive, productQuantity) {
  var isValid = true;

  if (inventoryamount < productQuantity) {
    isValid = false;
  } else if (inventorylive === false) {
    isValid = false;
  }

  return isValid;
};

exports.checkIfAvailable = checkIfAvailable;
//# sourceMappingURL=validate.js.map