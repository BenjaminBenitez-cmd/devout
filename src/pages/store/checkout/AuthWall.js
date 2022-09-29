import React from "react";
import { Col, Row } from "reactstrap";

import Signin from "components/Forms/Signin";
import FormGuestEmail from "components/Forms/GuestEmail";
import useAuth from "hooks/useAuth";
import { Redirect } from "react-router-dom";

import styles from "assets/css/auth.module.css";

const AuthWall = () => {
  const { authenticated } = useAuth();

  if (authenticated) {
    return <Redirect to="/checkout/shipping" />;
  }

  return (
    <>
      <Row className={styles.container}>
        <Col sm={12} md={6}>
          <div className="px-5">
            <Signin redirect="/checkout/shipping" />
          </div>
        </Col>
        <Col sm={12} md={6} className="mt-5 mt-md-0">
          <div className="px-5">
            <FormGuestEmail />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default AuthWall;
