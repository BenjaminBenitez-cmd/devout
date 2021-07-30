import React from "react";
import { Col, Row } from "reactstrap";
//css
import styles from "../assets/css/auth.module.css";
import Signin from "../components/Forms/Signin";
import GuestEmail from "../components/Forms/GuestEmail";
import useAuth from "../hooks/useAuth";
import { Redirect } from "react-router-dom";

const StoreCheckoutAuth = () => {
  const { authenticated } = useAuth();
  return (
    <>
      {authenticated && <Redirect to="/checkout/shipping" />}
      <Row className={styles.container}>
        <Col sm={12} md={6}>
          <div className="px-5">
            <Signin redirect="/checkout/shipping" />
          </div>
        </Col>
        <Col sm={12} md={6} className="mt-5 mt-md-0">
          <div className="px-5">
            <GuestEmail />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default StoreCheckoutAuth;
