import React from "react";
import { Col, Row } from "reactstrap";

import ProductCorousel from "components/product/Corousel";
import FeaturedProduct from "components/blocks/FeaturedProduct";
import Collection from "components/blocks/Collection";
import Brands from "components/blocks/Brands";
import LayoutStoreHome from "layouts/LayoutStoreHome";

import data from "data/featured.json";

const Collections = () => {
  return (
    <LayoutStoreHome>
      {/**Collection */}
      <Collection />

      {/**The latest */}
      <Row className="section">
        <Col sm={12} className="mb-4">
          <h3 className="text-medium text-bold">{data.featured.title}</h3>
        </Col>
        <ProductCorousel />
      </Row>

      {/**Featured sneaker */}
      <FeaturedProduct />

      {/** Brands you love */}
      <Brands />
      {/**The latest */}
      <Row className="section">
        <Col sm={12}>
          <h3 className="text-bold text-medium">{data.featured2.title}</h3>
        </Col>
        <ProductCorousel />
      </Row>
    </LayoutStoreHome>
  );
};

export default Collections;
