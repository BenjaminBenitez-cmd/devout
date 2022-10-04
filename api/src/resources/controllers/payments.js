import stripe from "stripe";
import config from "../../config";
import { SUCCESS } from "../../constants/statuscodes";
import { UsersCRUD } from "../../database/crud/user.crud";
import { ErrorHandler } from "../../utils/errors";
import Tokens from "../../utils/tokens";
import checkoutService from "../services/checkout.service";
import OrderService from "../services/order.service";
const stripeInstance = stripe(config.STRIPE_KEY);

const paymentIntent = async (request, response, next) => {
  let userid = null;
  const items = request.body.items;
  const email = request.body.email;
  try {
    if (request.headers.authorization) {
      const token = request.headers.authorization;

      //check token format
      if (!token.startsWith("Bearer ")) {
        next(new ErrorHandler(NOT_AUTHORIZED, "Invalid Token"));
      }

      const jwt = token.split(" ", 2)[1];

      const isValid = await Tokens.verifyToken(jwt);
      userid = isValid.id;
    } else {
      const userQuery = await UsersCRUD.createOne(email, null, null, null);
      userid = userQuery.rows[0].userid;
    }

    //create new order
    const orderQuery = await checkoutService.createNewOrder(userid, items);
    //multiply by 100 to convert to cents
    const total = OrderService.calculateOrder(items) * 100;
    //create payment intent
    const paymentIntent = await stripeInstance.paymentIntents.create({
      amount: total,
      currency: "usd",
      metadata: {
        orderid: orderQuery.orderdetailsid,
        userid: userid,
      },
    });

    response.status(SUCCESS).send({
      clientSecret: paymentIntent.client_secret,
      clientid: userid,
      orderid: orderQuery,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const paymentConfirm = async (request, response, next) => {
  const event = request.body;
  const paymentIntent = event.data.object;
  try {
    // Handle the event
    switch (event.type) {
      case "payment_intent.succeeded":
        await checkoutService.acceptOrder(
          paymentIntent.metadata.userid,
          paymentIntent.metadata.orderid
        );
        // Then define and call a method to handle the successful payment intent.
        // handlePaymentIntentSucceeded(paymentIntent);
        break;
      case "payment_intent.failed":
        await checkoutService.declineOrder(paymentIntent.metadata.orderid);

        break;
      case "payment_method.attached":
        const paymentMethod = event.data.object;

        // Then define and call a method to handle the successful attachment of a PaymentMethod.
        // handlePaymentMethodAttached(paymentMethod);
        break;
      // ... handle other event types
      default:
        break;
    }

    // Return a response to acknowledge receipt of the event
    response.status(200).end();
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const PaymentControllers = {
  paymentIntent,
  paymentConfirm,
};

export default PaymentControllers;
