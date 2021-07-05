const { SUCCESS, NOT_FOUND } = require("../../constants/statuscodes");
const {
  OrderCRUD,
  ProductCRUD,
  CartCRUD,
  CartItemCRUD,
  InventoryCRUD,
  PaymentCRUD,
} = require("../../database/crud");
const { ErrorHandler } = require("../../utils/errors");
const { checkResults } = require("../../utils/validate");

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
    console.log(err);
    next(err);
  }
};

//Get user orders
const getAllUserOrders = async (request, response, next) => {
  const { id } = request.user;

  try {
    const orderQuery = await OrderCRUD.getManyByUserID(id);
    response
      .status(SUCCESS)
      .json({ message: "success", orders: orderQuery.rows });
  } catch (err) {
    next(err);
  }
};

const createOrder = async (request, response, next) => {
  const { id } = request.user;
  const { provider, status } = request.body;

  /**
   *check if if items in cart are available
   *check if user has address
   *check if user has payment details
   *create an order details column
   *create order items for each item in the cart
   *return success message
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

    //get products
    const productItems = await Promise.all(
      cartItemsQuery.rows.map(async (item) => {
        const inventoryQuery = await InventoryCRUD.getAmount(item.skuid);
        checkResults(inventoryQuery, NOT_FOUND, "Item is unavailable");
        const { inventoryquantity, inventorylive } = inventoryQuery.rows[0];

        if (item.quantity > inventoryquantity) {
          throw new ErrorHandler(NOT_FOUND, "unable to meet quantity amount");
        } else if (!inventorylive) {
          throw new ErrorHandler(NOT_FOUND, "Item is not live");
        }

        return {
          ...item,
          ...inventoryQuery.rows[0],
        };
      })
    );

    /**
     * calculate total product items total
     */
    console.log(productItems);
    let total = productItems.reduce(
      (a, b) => a.price * a.quantity + b.price * b.quantity,
      0
    );

    /**
     * Insert payment info
     * @params { float} total
     * @params { String } provider
     * @params { Boolean } status
     *
     */
    const paymentQuery = await PaymentCRUD.createOne(total, provider, status);
    checkResults(paymentQuery, NOT_FOUND, "Something went wrong");

    /**
     *
     */
    const orderDetailQuery = await OrderCRUD.createOne(
      id,
      total,
      paymentQuery.rows[0].paymentid
    );

    checkResults(orderDetailQuery, NOT_FOUND, "Unable to add order");

    await Promise.all(
      cartItemsQuery.rows.forEach(async (item) => {
        await OrderCRUD.items.createOne(
          orderDetailQuery.rows[0].orderdetailid,
          item.productid,
          item.skuid
        );
      })
    );

    response.status(SUCCESS).json({
      message: "success",
      orders: { id: orderDetailQuery.rows[0].orderdetailid },
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
module.exports = {
  getAllOrders,
  getAllUserOrders,
  createOrder,
};
