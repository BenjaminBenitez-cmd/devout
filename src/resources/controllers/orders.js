import { SUCCESS, NOT_FOUND } from "../../constants/statuscodes";
import {
  OrderCRUD,
  ProductCRUD,
  CartCRUD,
  CartItemCRUD,
  InventoryCRUD,
  PaymentCRUD,
  UsersCRUD,
} from "../../database/crud";
import { checkResults } from "../../utils/validate";
import { checkoutService } from "../services/checkout.service";

const getAllOrders = async (_, response, next) => {
  try {
    //get all the orders
    const orderQuery = await OrderCRUD.getMany();
    let newOrders;

    if (orderQuery.rows.length > 0) {
      //Get the products
      newOrders = await Promise.all(
        orderQuery.rows.map(async (order) => {
          const { orderdetailsid } = order;

          //Get the items belonging to this order
          const itemsQuery = await OrderCRUD.items.getManyByOrderDetailsID(
            orderdetailsid
          );

          //Fetch the product info using the order item ProductID
          let products;
          if (itemsQuery.rows.length > 0) {
            products = await Promise.all(
              itemsQuery.rows.map(async (item) => {
                const productQuery = await ProductCRUD.getOneByID(
                  item.productid
                );
                const { productid, productname, productprice } =
                  productQuery.rows[0];
                return {
                  id: productid,
                  name: productname,
                  price: productprice,
                };
              })
            );
          }

          return {
            ...order,
            products: products,
          };
        })
      );
    }

    response.status(SUCCESS).json({ message: "Success", orders: newOrders });
  } catch (err) {
    next(err);
  }
};

//Get user orders
const getAllUserOrders = async (request, response, next) => {
  const { id } = request.user;

  try {
    const orderQuery = await OrderCRUD.getManyByUserID(id);
    let orders = [];
    if (orderQuery.rows.length > 0) {
      orders = orderQuery.rows.map((order) => {
        return {
          id: order.orderdetailsid,
          total: order.orderdetailtotal,
          status: order.paymentstatus,
        };
      });
    }
    response.status(SUCCESS).json({ message: "success", orders });
  } catch (err) {
    next(err);
  }
};

const createPublicOrder = async (request, response, next) => {
  const { id } = request.user;
  const { email } = request.body;

  /**
   *check if if items in cart are available
   *check if user has address
   *check if user has payment details
   *create an order details column
   *create order items for each item in the cart
   *Update the inventory for each product
   */
  try {
    //get cart with id
    const cartQuery = await CartCRUD.getOneByUserID(id);
    checkResults(cartQuery, NOT_FOUND, "No cart found");

    //get cartitems with cart id
    const cartItemsQuery = await CartItemCRUD.getManyBySessionID(
      cartQuery.rows[0].sessionid
    );
    checkResults(cartItemsQuery, NOT_FOUND, "No items found");

    const isValid = await checkoutService.validateItems(cartItemsQuery.rows);
    // const newOrder = await checkoutService.createNewOrder(id, isValid);

    //Cart and inventory clean up

    isValid.forEach(async (item) => {
      let newInventoryQuantity = item.inventoryquantity - item.quantity;
      let isLive = item.inventorylive;
      await InventoryCRUD.updateOne(
        item.inventoryid,
        newInventoryQuantity,
        isLive
      );
    });

    await CartCRUD.removeOne(cartQuery.rows[0].sessionid, id);

    response.status(SUCCESS).json({
      message: "success",
      orders: { id: newOrder.orderdetailsid },
    });
  } catch (err) {
    next(err);
  }
};

const createOrder = async (request, response, next) => {
  const { id } = request.user;
  /**
   *check if if items in cart are available
   *check if user has address
   *check if user has payment details
   *create an order details column
   *create order items for each item in the cart
   *Update the inventory for each product
   */
  try {
    //get cart with id
    const cartQuery = await CartCRUD.getOneByUserID(id);
    checkResults(cartQuery, NOT_FOUND, "No cart found");

    //get cartitems with cart id
    const cartItemsQuery = await CartItemCRUD.getManyBySessionID(
      cartQuery.rows[0].sessionid
    );
    checkResults(
      cartItemsQuery,
      NOT_FOUND,
      "Cannot create order without items in cart"
    );

    const isValid = await checkoutService.validateItems(cartItemsQuery.rows);

    const newOrder = await checkoutService.createNewOrder(id, isValid);

    //Cart and inventory clean up

    isValid.forEach(async (item) => {
      let newInventoryQuantity = item.inventoryquantity - item.quantity;
      let isLive = item.inventorylive;
      await InventoryCRUD.updateOne(
        item.inventoryid,
        newInventoryQuantity,
        isLive
      );
    });

    await CartCRUD.removeOne(cartQuery.rows[0].sessionid, id);

    response.status(SUCCESS).json({
      message: "success",
      orders: { id: newOrder.orderdetailsid },
    });
  } catch (err) {
    next(err);
  }
};

const getAnOrder = async (request, response, next) => {
  const { orderid } = request.params;
  try {
    //get order items
    const orderItems = await OrderCRUD.items.getManyByOrderDetailsID(orderid);
    //get payment info
    const orderInfo = await OrderCRUD.details.getOne(orderid);
    const paymentInfo = await PaymentCRUD.getOneByID(
      orderInfo.rows[0].orderdetailpaymentid
    );
    const customerInfo = await UsersCRUD.getOneByID(orderInfo.rows[0].userid);

    const itemsAndProducts = await Promise.all(
      orderItems.rows.map(async (item) => {
        const productQuery = await ProductCRUD.getOneByID(item.productid);
        return {
          id: item.orderitemsid,
          name: productQuery.rows[0].productname,
          quantity: item.orderquantity,
          total: item.orderquantity * productQuery.rows[0].productprice,
        };
      })
    );

    response.status(200).json({
      message: "Success",
      order: {
        id: orderid,
        paymentinfo: {
          id: paymentInfo.rows[0].paymentid,
          amount: paymentInfo.rows[0].paymentamount,
          status: paymentInfo.rows[0].paymentstatus,
        },
        items: itemsAndProducts,
        customer: {
          email: customerInfo.rows[0].useremail,
        },
      },
    });
  } catch (err) {
    next(err);
  }
};

const OrderControllers = {
  getAnOrder,
  getAllOrders,
  getAllUserOrders,
  createOrder,
};

export default OrderControllers;
