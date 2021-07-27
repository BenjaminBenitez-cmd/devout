import React from "react";
import { Col, Row } from "reactstrap";
import LayoutStoreHome from "../layouts/LayoutStoreHome";
import Signup from "../components/Forms/Signup";

const StoreSignup = () => {
  return (
    <LayoutStoreHome>
      <Row>
        <Col
          sm={12}
          className="my-5 d-flex justify-content-center align-items-center"
        >
          <Signup />
        </Col>
      </Row>
    </LayoutStoreHome>
  );
};

export default StoreSignup;
