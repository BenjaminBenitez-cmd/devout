import React from "react";
import { Col, Row } from "reactstrap";
import LayoutStoreHome from "../layouts/LayoutStoreHome";
import Signin from "../components/Forms/Signin";

const StoreSignin = () => {
  return (
    <LayoutStoreHome>
      <Row>
        <Col
          sm={12}
          className="my-5 d-flex justify-content-center align-items-center"
        >
          <Signin redirect="/shop" />
        </Col>
      </Row>
    </LayoutStoreHome>
  );
};

export default StoreSignin;
