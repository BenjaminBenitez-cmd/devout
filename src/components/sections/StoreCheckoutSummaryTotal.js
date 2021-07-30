import React from "react";
import { Col, Container, Row } from "reactstrap";
import {
  calculateSubTotal,
  calculateTax,
  calculateTotal,
} from "../../helpers/calculators";
import useCart from "../../hooks/useCart";
import settings from "../../data/settings.json";
import styles from "../../assets/css/storeCheckoutTotal.module.css";

const StoreCheckoutSummaryTotal = () => {
  const { cartItems } = useCart();
  return (
    <div>
      <Container fluid className="px-0">
        <div className={styles.underline}>
          <h5 className="text-small">
            Order Summary Items({cartItems.length})
          </h5>
        </div>
        {cartItems &&
          cartItems.map((item) => (
            <Row className="my-4">
              <Col sm={3}>
                <div>
                  <img
                    src={item.images[0].imageurl}
                    alt={item.alt}
                    className="img-fluid"
                  />
                </div>
              </Col>
              <Col sm={6}>
                <p className="text-bold text-upper">{item.name}</p>
              </Col>
              <Col sm={3}>
                <p className="text-end">${item.price}</p>
              </Col>
            </Row>
          ))}
      </Container>
      <Container fluid className="px-0">
        <div className={styles.underline}>
          <h5 className="text-small">Total Recap</h5>
        </div>
        <div className="my-4">
          <div className="d-flex justify-content-between my-1">
            <span className="text-upper">Subtotal</span>{" "}
            <span className="text-upper">${calculateSubTotal(cartItems)}</span>
          </div>
          <div className="d-flex justify-content-between my-1">
            <span className=" text-upper">Shipping Total</span>{" "}
            <span className=" text-upper">$0</span>
          </div>
          <div className="d-flex justify-content-between my-1">
            <span className=" text-upper">Tax</span>{" "}
            <span className=" text-upper">
              ${calculateTax(calculateSubTotal(cartItems), settings.tax)}
            </span>
          </div>
          <div className="d-flex justify-content-between my-1">
            <span className=" text-upper">Total</span>
            <span className=" text-upper">
              ${calculateTotal(cartItems, settings.tax)}
            </span>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default StoreCheckoutSummaryTotal;
