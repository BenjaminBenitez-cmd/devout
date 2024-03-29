import React from "react";
import { Col, Row } from "reactstrap";

import LayoutStoreHome from "layouts/StoreHome";
import FormSignup from "components/forms/Signup";

const Signup = () => {
  return (
    <LayoutStoreHome>
      <Row>
        <Col
          sm={12}
          className="my-5 d-flex justify-content-center align-items-center"
        >
          <FormSignup />
        </Col>
      </Row>
    </LayoutStoreHome>
  );
};

export default Signup;
