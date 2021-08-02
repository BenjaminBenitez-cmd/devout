import React from "react";
import { Col, Container, Row } from "reactstrap";
//data
import pagedata from "../../data/home.json";

const StoreAbout = () => {
  return (
    <Row className="section">
      <Col sm={6}>
        <img
          className="img-fluid"
          src={pagedata.about.images[0].url}
          alt={pagedata.about.images[0].alt}
        />
      </Col>
      <Col sm={6} className="d-flex">
        <Container fluid>
          <Row className="mt-5">
            <div>
              <span className="text-medium-large text-bold">.5</span>
              <h3 className="text-extra-large">At Your Best</h3>
              <p className="w-50 mt-3">{pagedata.about.description}</p>
            </div>
          </Row>
        </Container>
      </Col>
    </Row>
  );
};

export default StoreAbout;
