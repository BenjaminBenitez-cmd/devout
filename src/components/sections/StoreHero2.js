import React from "react";
import { Col, Row } from "reactstrap";
import Circle from "../shapes/Circle";
import data from "../../data/featured.json";

const StoreHero2 = () => {
  return (
    <Row>
      <Col sm={6}>
        <Circle height="300px" width="300px">
          <img src={data.hero[0].image.url} alt={data.hero[0].image.url} />
        </Circle>
      </Col>
      <Col sm={4}>
        <Circle height="300px" width="300px">
          <img src={data.hero[1].image.url} alt={data.hero[1].image.url} />
        </Circle>
      </Col>
      <Col sm={4}>
        <Circle height="300px" width="300px">
          <img src={data.hero[2].image.url} alt={data.hero[2].image.url} />
        </Circle>
      </Col>
    </Row>
  );
};

export default StoreHero2;
