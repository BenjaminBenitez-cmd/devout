const { SUCCESS } = require("../../constants/statuscodes");
const { OrderCRUD, ProductCRUD } = require("../../database/crud");

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

module.exports = {
  getAllOrders,
};
