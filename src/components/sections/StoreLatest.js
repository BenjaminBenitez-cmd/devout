import React from "react";
import { Col, Row } from "reactstrap";

import ProductCorousel from "components/product/ProductCorousel";
import pagedata from "data/home.json";

const StoreLatest = () => {
  return (
    <>
      <Row>
        <Col sm={6} className="mx-auto">
          <h2 className="text-extra-large text-bold">
            {pagedata.latest.title}
          </h2>
        </Col>
      </Row>
      <Row className="section">
        <ProductCorousel />
      </Row>
    </>
  );
};

export default StoreLatest;
