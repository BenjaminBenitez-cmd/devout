import React, { useState } from "react";
import { Col, Container, Row } from "reactstrap";
import StoreCollection from "../components/sections/StoreCollection";
import LayoutStoreHome from "../layouts/LayoutStoreHome";
//data
import productdata from "../data/productdetails.json";
import ProductCard from "../components/product/ProductCard";
import StoreFilter from "../components/sidebar/StoreFilter";
import useProducts from "../hooks/useProducts";
import { filterByOption } from "../helpers/filters";

const StoreProducts = () => {
  const { getProductsQuery } = useProducts();
  const [filter, setFilter] = useState("addidas");
  const toggleFilter = (e) => {
    setFilter(e.target.value);
  };

  return (
    <LayoutStoreHome>
      {/**Collection bar */}
      <StoreCollection />
      <Row className="justify-content-between my-5">
        {/**Product info */}
        <Col sm={3}>
          <h2 className="text-medium text-bold d-inline">Summer Collection</h2>
        </Col>
        <Col md={{ size: 2, offset: 6 }}>
          <span className="text-small text-uppercase ml-2">Hide Filters</span>
        </Col>
        <Col md={1}>
          <span className="text-small text-uppercase ml-2">
            {productdata.length} Items
          </span>
        </Col>
      </Row>
      <Row>
        <Col md={2}>
          <StoreFilter toggleFilter={toggleFilter} />
        </Col>
        <Col md={{ size: 9, offset: 1 }}>
          <Container fluid>
            <Row>
              {/**Products */}
              {getProductsQuery.data &&
                filterByOption(getProductsQuery.data.products, filter).map(
                  (product, index) => (
                    <Col md={4}>
                      <ProductCard key={index} {...product} />
                    </Col>
                  )
                )}
            </Row>
          </Container>
        </Col>
      </Row>
    </LayoutStoreHome>
  );
};

export default StoreProducts;
