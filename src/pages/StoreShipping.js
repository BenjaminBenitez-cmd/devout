import { useFormikContext } from "formik";
import React from "react";
import { Col, FormGroup, Row } from "reactstrap";
import PrimaryButtonLink from "../components/buttons/PrimaryButtonLink";
import CheckoutSteps from "../components/headers/CheckoutSteps";
import { MySelect, MyTextField } from "../components/inputs/CustomInputs";
import settings from "../data/settings.json";

const StoreShipping = () => {
  const { isValid } = useFormikContext();
  return (
    <Row>
      <Col sm={12}>
        <CheckoutSteps step1 />
      </Col>
      <Col sm={12} md={4}>
        <FormGroup className="my-3">
          <MyTextField
            label="City"
            type="text"
            name="city"
            placeholder="city"
          />
        </FormGroup>
        <FormGroup className="my-3">
          <MyTextField
            label="State"
            type="text"
            name="state"
            placeholder="state"
          />
        </FormGroup>
        <FormGroup className="my-3">
          <MyTextField
            label="Phone"
            type="text"
            name="phone"
            placeholder="phone"
          />
        </FormGroup>
        <FormGroup className="my-3">
          <MySelect
            name="country"
            label="Country"
            options={settings.countries}
          />
        </FormGroup>
        <FormGroup className="my-3">
          <MyTextField
            label="Address 1"
            type="text"
            name="address1"
            placeholder="address 1"
          />
        </FormGroup>
        <FormGroup className="my-3">
          <MyTextField
            label="Address 2"
            type="text"
            name="address2"
            placeholder="address 2"
          />
        </FormGroup>
      </Col>
      <Col sm={4} md={{ span: 4, offset: 4 }}>
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
