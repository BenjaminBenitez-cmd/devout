import React from "react";
import { Col, Container, Row } from "reactstrap";
import Heading from "../components/typography/Heading";

const LayoutAdminPage = (props) => {
  return (
    <Col sm={8}>
      <Container>
        <Row>
          <Heading text={props.title} />
        </Row>
        <Row>
          <Col sm={12} className="mt-5">
            {props.children}
          </Col>
        </Row>
      </Container>
    </Col>
  );
};

export default LayoutAdminPage;
