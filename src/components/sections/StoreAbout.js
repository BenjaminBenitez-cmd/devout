import React from "react";
import { Col, Row } from "reactstrap";
//css
import styles from "../../assets/css/about.module.css";
//data
import pagedata from "../../data/home.json";

const StoreAbout = () => {
  return (
    <Row className="section">
      <Col sm={9}>
        <img
          className={styles.bigcircle}
          src={pagedata.about.images[0].url}
          alt={pagedata.about.images[0].alt}
        />
        <img
          className={styles.smallcircle}
          src={pagedata.about.images[1].url}
          alt={pagedata.about.images[1].alt}
        />
      </Col>
      <Col sm={3} className="d-flex align-items-center">
        <div>
          <p className="text-medium-large text-bold">.4</p>
          <h2>{pagedata.about.title}</h2>
        </div>
      </Col>
    </Row>
  );
};

export default StoreAbout;
