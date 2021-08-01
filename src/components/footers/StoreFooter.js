import React from "react";
import { Col, Row } from "reactstrap";
import FeatherIcons from "feather-icons-react";

const StoreFooter = () => {
  return (
    <Row className="mt-5">
      <Col xs={6} sm={3} md={3} lg={1}>
        <p>&copy; Devout</p>
      </Col>
      <Col xs={6} sm={3} md={3} lg={1}>
        <p className="text-upper">Newsletter</p>
      </Col>
      <Col xs={6} sm={3} md={3} lg={1}>
        <p className="text-upper">Returns</p>
      </Col>
      <Col xs={6} sm={3} md={3} lg={2}>
        <p className="text-upper">Sneaker news</p>
      </Col>
      <Col xs={6} sm={3} md={3} lg={1}>
        <p className="text-upper">FAQ</p>
      </Col>
      <Col xs={6} sm={3} md={3} lg={2}>
        <p className="text-upper">Privacy Policy</p>
      </Col>
      <Col xs={6} sm={3} md={3} lg={{ size: 1, offset: 2 }}>
        <FeatherIcons icon="facebook" />
      </Col>
      <Col xs={6} sm={3} md={3} lg={1}>
        <FeatherIcons icon="instagram" />
      </Col>
    </Row>
  );
};

export default StoreFooter;
