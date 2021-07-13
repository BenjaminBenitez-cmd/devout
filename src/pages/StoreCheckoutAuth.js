import React from "react";
import { Col, CustomInput, FormGroup, Row } from "reactstrap";
import PrimaryButton from "../components/buttons/PrimaryButton";
import { CustomRadio } from "../components/inputs/Input";
import LayoutStoreHome from "../layouts/LayoutStoreHome";
//css
import styles from "../assets/css/auth.module.css";
import { NavLink } from "react-router-dom";

const StoreCheckoutAuth = () => {
  return (
    <LayoutStoreHome>
      <Row className={styles.container}>
        <Col sm={12} md={6}>
          <div className="px-5">
            <h1 className="text-medium">Login</h1>
            <FormGroup className="my-3">
              <CustomInput type="email" />
            </FormGroup>
            <FormGroup className="mt-3">
              <CustomInput type="password" />
            </FormGroup>
            <div>
              <NavLink className="text-extrasmall" to="/signup">
                Sign up
              </NavLink>
            </div>
            <div className="mt-5">
              <PrimaryButton text="login" />
            </div>
          </div>
        </Col>
        <Col sm={12} md={6} className="mt-5 mt-md-0">
          <div className="px-5">
            <h1 className="text-medium">Guest Checkout</h1>
            <FormGroup className="mt-3">
              <CustomInput type="email" />
            </FormGroup>
            <div className="mt-2">
              <CustomRadio label="Sign me up for the latest updates" />
            </div>
            <div className="mt-5">
              <PrimaryButton text="Checkout" />
            </div>
          </div>
        </Col>
      </Row>
    </LayoutStoreHome>
  );
};

export default StoreCheckoutAuth;
