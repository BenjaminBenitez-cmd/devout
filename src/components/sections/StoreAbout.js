import React from "react";
import { Col, Container, Row } from "reactstrap";
//css
import styles from "../../assets/css/about.module.css";
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
          <Row>
            <div>
              <p className="text-medium-large text-bold">.4</p>
              <h2>{pagedata.about.title}</h2>
            </div>
          </Row>
        </Container>
      </Col>
    </Row>
  );
};

export default StoreAbout;
