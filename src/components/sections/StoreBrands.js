import React from "react";
import { Col, Row } from "reactstrap";
import Circle from "../shapes/Circle";
import data from "../../data/featured.json";

const StoreBrands = () => {
  return (
    <Row className="section">
      <h3 className="text-medium text-bold">{data.brands.title}</h3>
      {data.brands.brands.map((brand, index) => (
        <Col key={index} sm={4} className="mx-auto">
          <Circle height="350px" width="350px" key={brand.id}>
            <img src={brand.image.url} alt={brand.image.alt} />
          </Circle>
        </Col>
      ))}
    </Row>
  );
};

export default StoreBrands;
