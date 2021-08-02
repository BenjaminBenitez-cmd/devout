import React from "react";
import { NavLink } from "react-router-dom";
import { Card, Col, Row } from "reactstrap";
//data
import homedata from "../../data/home.json";
import styles from "../../assets/css/overlay.module.css";

const StoreFeatures = () => {
  return (
    <Row className="section">
      {homedata.featured.map((feature, index) => (
        <Col sm={4} key={index}>
          <NavLink to={"/products/" + feature.title}>
            <Card className="border-0 w-100 mb-4">
              <div
                style={{
                  backgroundImage: `url(${feature.url})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  height: "300px",
                }}
              >
                <div className={styles.overlay}>
                  <div>
                    <span className="text-extra-large">.{index + 1}</span>
                    <h2 className="text-small w-50">{feature.description}</h2>
                  </div>
                </div>
              </div>
            </Card>
          </NavLink>
        </Col>
      ))}
    </Row>
  );
};

export default StoreFeatures;
