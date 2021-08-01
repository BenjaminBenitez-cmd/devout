import React from "react";
import { Card, Col, Row } from "reactstrap";
//circle
import Circle from "../../components/shapes/Circle";
//data
import homedata from "../../data/home.json";

const StoreFeatures = () => {
  return (
    <Row className="section">
      {homedata.featured.map((feature, index) => (
        <Col sm={4} key={index}>
          <Card className="border-0 mb-5">
            <div
              style={{
                height: "300px",
                overflow: "hidden",
              }}
            >
              <img src={feature.url} alt={feature.alt} className="img-fluid" />
            </div>
            <p className="text-medium-large text-bold">.{index + 1}</p>
            <h2 className="text-medium">{feature.title}</h2>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default StoreFeatures;
