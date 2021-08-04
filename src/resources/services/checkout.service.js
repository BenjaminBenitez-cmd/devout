import { NOT_FOUND } from "../../constants/statuscodes";
import {
  OrderCRUD,
  InventoryCRUD,
  PaymentCRUD,
  SKUCRUD,
  CartItemCRUD,
  CartCRUD,
  ProductCRUD,
  UsersCRUD,
} from "../../database/crud";
import { checkResults, checkIfAvailable } from "../../utils/validate";
import { ErrorHandler } from "../../utils/errors";
import SendGridService from "./sendgrid.service";
import config from "../../config";

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

      let [provider, status] = ["stripe", "initialized"];

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
          item.skuid,
          item.quantity
        );
      });

      resolve(orderDetailQuery.rows[0]);
    } catch (err) {
      reject(err);
    }
  });
};

/**
 *
 * @param {Integer} orderid
 * @returns resolved promise
 */
const acceptOrder = (userid, orderid) => {
  return new Promise(async (resolve, reject) => {
    try {
      const orderQuery = await OrderCRUD.details.getOne(orderid);
      //toggle the payed status on our server
      await PaymentCRUD.updateStatus(
        orderQuery.rows[0].orderdetailpaymentid,
        "Fullfilled"
      );
      const orderItems = await OrderCRUD.items.getManyByOrderDetailsID(
        orderQuery.rows[0].orderdetailsid
      );
      //update the inventory numbers for all the products
      orderItems.rows.forEach(async (item) => {
        const skuQuery = await SKUCRUD.getOneBySKUID(item.skuid);
        const inventoryQuery = await InventoryCRUD.getOne(
          skuQuery.rows[0].productinventoryid
        );
        const newQuantity =
          inventoryQuery.rows[0].inventoryquantity - item.orderquantity;
        const isLive = newQuantity === 0 ? false : true;
        await InventoryCRUD.updateOne(
          inventoryQuery.rows[0].inventoryid,
          newQuantity,
          isLive
        );
      });

      let emailItems = await Promise.all(
        orderItems.rows.map(async (item) => {
          const productQuery = await ProductCRUD.getOneByID(item.productid);
          return {
            name: productQuery.rows[0].productname,
            price: productQuery.rows[0].productprice,
            quantity: item.orderquantity,
          };
        })
      );

      const userQuery = await UsersCRUD.getOneByID(userid);

      await SendGridService.sendReceiptEmail(
        userQuery.rows[0].useremail,
        orderid,
        emailItems,
        config.CLIENT_URL
      );

      const cartQuery = await CartCRUD.getOneByUserID(userid);
      //if there is a cart for user clear it
      if (cartQuery.rows.length > 0) {
        await CartItemCRUD.removeAll(cartQuery.rows[0].sessionid);
      }
      resolve(true);
    } catch (err) {
      reject(err);
    }
  });
};

const declineOrder = (orderid) => {
  return new Promise(async (resolve, reject) => {
    try {
      const orderDetailQuery = await OrderCRUD.details.getManyByOrderDetailsID(
        orderid
      );
      await PaymentCRUD.updateStatus(
        orderDetailQuery.rows[0].orderdetailpaymentid,
        "Canceled"
      );
      resolve(true);
    } catch (err) {
      reject(err);
    }
  });
};

const checkoutService = {
  validateItems,
  createNewOrder,
  declineOrder,
  acceptOrder,
};

export default checkoutService;
