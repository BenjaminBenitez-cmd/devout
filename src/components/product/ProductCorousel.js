import React from "react";
import { Col } from "reactstrap";
import ProductCard from "./ProductCard";
//product data
import productdata from "../../data/productdetails.json";

const ProductCorousel = () => {
  return (
    <>
      {productdata.map((product, index) => (
        <Col lg={3} md={4} sm={4} key={index}>
          <ProductCard {...product} key={index} />
        </Col>
      ))}
    </>
  );
};

export default ProductCorousel;
