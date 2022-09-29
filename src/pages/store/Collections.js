import React from "react";
import { Col, Row } from "reactstrap";

import ProductCorousel from "components/product/ProductCorousel";
import StoreFeaturedProduct from "components/sections/StoreFeaturedProduct";
import StoreCollection from "components/sections/StoreCollection";
import StoreBrands from "components/sections/StoreBrands";
import LayoutStoreHome from "layouts/LayoutStoreHome";

import data from "data/featured.json";

const Collections = () => {
  return (
    <LayoutStoreHome>
      {/**Collection */}
      <StoreCollection />

      {/**The latest */}
      <Row className="section">
        <Col sm={12} className="mb-4">
          <h3 className="text-medium text-bold">{data.featured.title}</h3>
        </Col>
        <ProductCorousel />
      </Row>

      {/**Featured sneaker */}
      <StoreFeaturedProduct />

      {/** Brands you love */}
      <StoreBrands />
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
