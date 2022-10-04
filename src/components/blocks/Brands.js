import React from "react";
import { Col, Row } from "reactstrap";

import data from "data/featured.json";

const Brands = () => {
  return (
    <Row className="section">
      <h3 className="text-medium text-bold">{data.brands.title}</h3>
      {data.brands.brands.map((brand, index) => (
        <Col key={index} sm={4} className="mx-auto mt-4">
          <img
            src={brand.image.url}
            alt={brand.image.alt}
            className="img-fluid"
          />
        </Col>
      ))}
    </Row>
  );
};

export default Brands;
