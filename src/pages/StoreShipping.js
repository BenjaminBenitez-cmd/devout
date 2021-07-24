import { Field, useFormikContext } from "formik";
import React from "react";
import { Col, FormGroup, Row } from "reactstrap";
import PrimaryButtonLink from "../components/buttons/PrimaryButtonLink";
import inputStyles from "../assets/css/input.module.css";
import CheckoutSteps from "../components/headers/CheckoutSteps";

const StoreShipping = () => {
  const { isValid } = useFormikContext();
  return (
    <Row>
      <Col sm={12}>
        <CheckoutSteps step1 />
      </Col>
      <Col sm={12} md={8}>
        <FormGroup className="my-3">
          <Field
            type="text"
            name="city"
            placeholder="city"
            className={inputStyles.input}
          />
        </FormGroup>
        <FormGroup className="my-3">
          <Field
            type="text"
            name="state"
            placeholder="state"
            className={inputStyles.input}
          />
        </FormGroup>
        <FormGroup className="my-3">
          <Field
            type="text"
            name="phone"
            placeholder="phone"
            className={inputStyles.input}
          />
        </FormGroup>
        <FormGroup className="my-3">
          <Field
            type="text"
            name="country"
            placeholder="country"
            className={inputStyles.input}
          />
        </FormGroup>
        <FormGroup className="my-3">
          <Field
            type="text"
            name="address1"
            placeholder="address 1"
            className={inputStyles.input}
          />
        </FormGroup>
        <FormGroup className="my-3">
          <Field
            type="text"
            name="address2"
            placeholder="address 2"
            className={inputStyles.input}
          />
        </FormGroup>
      </Col>
      <Col sm={4}>
        <PrimaryButtonLink
          style={{
            backgroundColor: !isValid ? "gray" : "var(--main-color)",
            pointerEvents: !isValid ? "none" : "auto",
          }}
          to="/checkout/payment"
          text="Continue"
        />
      </Col>
    </Row>
  );
};

export default StoreShipping;
