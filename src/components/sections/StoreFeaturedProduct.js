import React from "react";
import { Link } from "react-router-dom";
import { Col, Row } from "reactstrap";

import data from "data/featured.json";
import styles from "assets/css/featuredproduct.module.css";

const StoreFeaturedProduct = () => {
  return (
    <Row className="">
      <Col sm={4} className="mx-auto">
        <h3 className="text-extra-large text-bold">{data.product.title}</h3>
      </Col>
      <Col sm={12} className="d-flex justify-content-center mt-3">
        <img
          src={data.product.image.url}
          alt={data.product.image.alt}
          className={styles.imageContainer}
        />
      </Col>

      <Col sm={4} className="mx-auto text-center mt-5">
        <Link to="/" className="text-medium">
          Shop now
        </Link>
      </Col>
    </Row>
  );
};

export default StoreFeaturedProduct;
