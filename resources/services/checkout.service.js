const { NOT_FOUND } = require("../../constants/statuscodes");
const {
  OrderCRUD,
  InventoryCRUD,
  PaymentCRUD,
} = require("../../database/crud");
const { ErrorHandler } = require("../../utils/errors");
const { checkResults, checkIfAvailable } = require("../../utils/validate");

/**
 * ValidateItems will check the inventory against items
 * @param {array} items an array of cart items
 * @return {promise} returns a promise or error
 */
const validateItems = async (items) => {
  return new Promise(async (resolve, reject) => {
    try {
      const mappedItems = await Promise.all(
        items.map(async (item) => {
          const inventoryQuery = await InventoryCRUD.getAmount(item.skuid);
          checkResults(inventoryQuery, NOT_FOUND, "Inventory not found");

          const { inventoryquantity, inventorylive } = inventoryQuery.rows[0];

          const isValid = checkIfAvailable(
            inventoryquantity,
            inventorylive,
            item.quantity
          );

          if (!isValid) {
            reject(new ErrorHandler(NOT_FOUND, "Product Unavailable"));
          }

          return {
            ...item,
            ...inventoryQuery.rows[0],
          };
        })
      );

      resolve(mappedItems);
    } catch (err) {
      reject(err);
    }
  });
};

/**
 *
 * @param {array} items items that will be used to create order
 * @return { promise } will contain new order or an error
 */

const createNewOrder = async (userid, items) => {
  return new Promise(async (resolve, reject) => {
    try {
      let total =
        items.length > 1
          ? items.reduce(
              (a, b) => a.price * a.quantity + b.price * b.quantity,
              0
            )
          : items[0].quantity * items[0].price;

      let [provider, status] = ["stripe", "pending"];

      const paymentQuery = await PaymentCRUD.createOne(total, provider, status);

      //create order
      const orderDetailQuery = await OrderCRUD.createOne(
        userid,
        total,
        paymentQuery.rows[0].paymentid
      );

      if (orderDetailQuery.rows.length < 0) {
        reject(new ErrorHandler(NOT_FOUND, "Unable to add order"));
      }

      items.forEach(async (item) => {
        await OrderCRUD.items.createOne(
          orderDetailQuery.rows[0].orderdetailsid,
          item.productid,
          item.skuid
        );
      });

      resolve(orderDetailQuery.rows[0]);
    } catch (err) {
      reject(err);
    }
  });
};

module.exports.checkoutService = {
  validateItems,
  createNewOrder,
};
