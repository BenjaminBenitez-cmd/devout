import React from "react";
import { Col, Row } from "reactstrap";
import FeatherIcons from "feather-icons-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Row className="mt-5">
      <Col xs={6} sm={3} md={3} lg={1}>
        <p>&copy; Devout</p>
      </Col>
      <Col xs={6} sm={3} md={3} lg={1}>
        <Link to="template">
          <p className="text-upper">Newsletter</p>
        </Link>
      </Col>
      <Col xs={6} sm={3} md={3} lg={1}>
        <Link to="template">
          <p className="text-upper">Returns</p>
        </Link>
      </Col>
      <Col xs={6} sm={3} md={3} lg={2}>
        <Link to="template">
          <p className="text-upper">Sneaker news</p>
        </Link>
      </Col>
      <Col xs={6} sm={3} md={3} lg={1}>
        <Link to="template">
          <p className="text-upper">FAQ</p>
        </Link>
      </Col>
      <Col xs={6} sm={3} md={3} lg={2}>
        <p className="text-upper">Privacy Policy</p>
      </Col>
      <Col xs={6} sm={3} md={3} lg={{ size: 1, offset: 2 }}>
        <a href="https://github.com/BenjaminBenitez-cmd/devout">
          <FeatherIcons icon="github" />
        </a>
      </Col>
    </Row>
  );
};

export default Footer;
