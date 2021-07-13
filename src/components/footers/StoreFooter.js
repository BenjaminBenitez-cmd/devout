import React from "react";
import { Col, Row } from "reactstrap";
import FeatherIcons from "feather-icons-react";

const StoreFooter = () => {
  return (
    <Row>
      <Col sm={1}>
        <p>&copy; Devout</p>
      </Col>
      <Col sm={1}>
        <p className="text-upper">Newsletter</p>
      </Col>
      <Col sm={1}>
        <p className="text-upper">Returns</p>
      </Col>
      <Col sm={2}>
        <p className="text-upper">Sneaker news</p>
      </Col>
      <Col sm={1}>
        <p className="text-upper">FAQ</p>
      </Col>
      <Col sm={2}>
        <p className="text-upper">Privacy Policy</p>
      </Col>
      <Col sm={{ size: 1, offset: 2 }}>
        <FeatherIcons icon="facebook" />
      </Col>
      <Col sm={1}>
        <FeatherIcons icon="instagram" />
      </Col>
    </Row>
  );
};

export default StoreFooter;
