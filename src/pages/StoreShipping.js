import { Field } from "formik";
import React from "react";
import { Col, FormGroup, Row } from "reactstrap";
import PrimaryButtonLink from "../components/buttons/PrimaryButtonLink";
import inputStyles from "../assets/css/input.module.css";

const StoreShipping = () => {
  return (
    <Row>
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
        <PrimaryButtonLink to="/checkout/payment" />
      </Col>
    </Row>
  );
};

export default StoreShipping;
