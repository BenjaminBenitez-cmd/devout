import React from "react";
import { Col, Row } from "reactstrap";

import LayoutStoreHome from "layouts/StoreHome";
import FormSignin from "components/forms/Signin";

const Signin = () => {
  return (
    <LayoutStoreHome>
      <Row>
        <Col
          sm={12}
          className="my-5 d-flex justify-content-center align-items-center"
        >
          <FormSignin redirect="/shop" />
        </Col>
      </Row>
    </LayoutStoreHome>
  );
};

export default Signin;
