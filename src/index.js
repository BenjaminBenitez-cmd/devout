const express = require("express");
const { SKUCRUD } = require("./database/crud");
const { productRouter } = require("./resources/routes/products.route");
const { handleError } = require("./utils/errors");
const app = express();
const morgan = require("morgan");
const { categoryRouter } = require("./resources/routes/categories.route");
const { orderRouter } = require("./resources/routes/orders.route");

const { userRouter } = require("./resources/routes/user.route");
const { cartRouter } = require("./resources/routes/cart.route");
const { userOrderRouter } = require("./resources/routes/userorder.route");
const { AddressRouter } = require("./resources/routes/address.route");
import AuthControllers from "./resources/controllers/authorization";

app.use(express.json());
app.use(morgan("tiny"));

app.get("/api/hello", (request, response) => {
  SKUCRUD.values.getManyByProductID(1).then((res) => {
    response.status(200).send(res.rows);
  });
});

app.use("/api/v1/products", productRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/orders", orderRouter);

//routes for handling user requests
app.use("/api/v1/users/address", AddressRouter);
app.use("/api/v1/users/cart", cartRouter);
app.use("/api/v1/users/orders", userOrderRouter);
app.use("/api/v1/users", userRouter);

//admin routes
app.post("/api/v1/admin/signin", AuthControllers.signInAnAdmin);
app.post("/api/v1/admin/signup", AuthControllers.createAnAdmin);

//guest routes
app.post("/api/v1/guest/order");

const port = process.env.PORT || 3000;

app.use((error, request, response, next) => {
  handleError(error, response);
});

module.exports = app.listen(port, () => {
  console.log("Listening on port 3000...");
});
