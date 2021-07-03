const express = require("express");
const { SKUCRUD } = require("./database/crud");
const { productRouter } = require("./resources/routes/products.route");
const { handleError } = require("./utils/errors");
const app = express();
const morgan = require("morgan");
const { categoryRouter } = require("./resources/routes/categories.route");
const { OrderRouter } = require("./resources/routes/orders.route");

app.use(express.json());
app.use(morgan("tiny"));

app.get("/api/hello", (request, response) => {
  SKUCRUD.values.getManyByProductID(1).then((res) => {
    response.status(200).send(res.rows);
  });
});

app.use("/api/admin/products", productRouter);
app.use("/api/admin/categories", categoryRouter);
app.use("/api/admin/orders", OrderRouter);

const port = process.env.PORT || 3000;

app.use((error, request, response, next) => {
  handleError(error, response);
});

module.exports = app.listen(port, () => {
  console.log("Listening on port 3000...");
});
