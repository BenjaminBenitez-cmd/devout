import React from "react";
import { Link } from "react-router-dom";
import { Col, Row } from "reactstrap";
import Circle from "../shapes/Circle";
import data from "../../data/featured.json";

const StoreFeaturedProduct = () => {
  return (
    <Row className="d-flex flex-column align-items-center justify-content-center">
      <Col sm={4} className="mx-auto">
        <h3 className="text-extra-large text-bold">{data.product.title}</h3>
      </Col>
      <Circle height="697px" width="697px" className="mt-5">
        <img src={data.product.image.url} alt={data.product.image.alt} />
      </Circle>
      <Col sm={4} className="mx-auto text-center mt-5">
        <Link to="/" className="text-medium">
          Shop now
        </Link>
      </Col>
    </Row>
  );
};

export default StoreFeaturedProduct;
