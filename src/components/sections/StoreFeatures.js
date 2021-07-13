import React from "react";
import { Col, Row } from "reactstrap";
//circle
import Circle from "../../components/shapes/Circle";
//data
import homedata from "../../data/home.json";

const StoreFeatures = () => {
  return (
    <Row className="section">
      {homedata.featured.map((feature, index) => (
        <Col sm={4} key={index}>
          <Circle height="300px" width="300px">
            <img src={feature.url} alt={feature.alt} className="img-fluid" />
          </Circle>
          <p className="text-medium-large text-bold">.{index + 1}</p>
          <h2 className="text-medium">{feature.title}</h2>
        </Col>
      ))}
    </Row>
  );
};

export default StoreFeatures;
