const express = require("express");
const db = require("./database/connection");
const { UserModel } = require("./resources/crud/user.crud");
const { productRouter } = require("./resources/routes/products.route");
const { handleError } = require("./utils/errors");
const app = express();

app.use(express.json());

app.get("/api/hello", (request, response) => {
  response.status(200).send("hello");
});

app.use("/api/admin/products", productRouter);
app.use("/api/admin/discounts");
app.use("/api/admin/orders");

const port = process.env.PORT || 3000;

app.use((error, request, response, next) => {
  handleError(error, response);
});

module.exports = app.listen(port, () => {
  console.log("Listening on port 3000...");
});
