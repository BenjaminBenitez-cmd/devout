import React from "react";
import { NavLink } from "react-router-dom";
import { Col, Row } from "reactstrap";
import collectiondata from "../../data/collections.json";

const StoreCollection = () => {
  return (
    <Row>
      {collectiondata.map((collection, index) => (
        <Col md={4} key={index}>
          <div className="d-flex justify-content-center">
            <NavLink to="/products">
              <p className="text-small text-uppercase">{collection}</p>
            </NavLink>
          </div>
        </Col>
      ))}
    </Row>
  );
};

export default StoreCollection;
