import express, { response } from "express";
import morgan from "morgan";

//routers
import { productRouter } from "./resources/routes/products.route";
import { orderRouter } from "./resources/routes/orders.route";
import { categoryRouter } from "./resources/routes/categories.route";
import { userRouter } from "./resources/routes/user.route";
import { cartRouter } from "./resources/routes/cart.route";
import { userOrderRouter } from "./resources/routes/userorder.route";
import { addressRouter } from "./resources/routes/address.route";

//Status codes
import { handleError } from "./utils/errors";
import AuthControllers from "./resources/controllers/authorization";
import { ImageRouter } from "./resources/routes/image.route";
import db from "./database/connection";
import cors from "cors";
import { paymentRouter } from "./resources/routes/payment.route";

const app = express();

app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());

app.use(express.static(__dirname + "/public"));

app.get("/", (request, response) => {
  response.send("Welcome to Devout :)");
});

app.use("/api/v1/products", productRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/orders", orderRouter);

//routes for handling user requests
app.use("/api/v1/users/payments", paymentRouter);
app.use("/api/v1/users/address", addressRouter);
app.use("/api/v1/users/cart", cartRouter);
app.use("/api/v1/users/orders", userOrderRouter);
app.use("/api/v1/users", userRouter);

//admin routes
app.post("/api/v1/admin/signin", AuthControllers.signInAnAdmin);
app.post("/api/v1/admin/signup", AuthControllers.createAnAdmin);

app.use("/api/v1/images", ImageRouter);

const port = process.env.PORT || 3005;

app.use((error, request, response, next) => {
  handleError(error, response);
});

module.exports = app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
