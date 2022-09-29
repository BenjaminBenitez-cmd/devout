import React from "react";
import { Col, Container, Row } from "reactstrap";

import PrimaryButton from "components/buttons/PrimaryButton";
import OptionItem from "components/other/OptionItem";

export const StoreCartItem = ({ item, handleRemove }) => {
  return (
    <Row className="mb-3" key={item.id}>
      <Col xs={4} md={3}>
        <img
          className="img-fluid"
          src={item.images[0].imageurl}
          alt={item.images[0].alt}
        />
      </Col>
      <Col xs={5} md={7}>
        <div>
          <h5 className="text-small text-bold">{item.name}</h5>
        </div>
        <div>
          <Container fluid className="p-0">
            <Row>
              <OptionItem title="Color" value="red" />
              <OptionItem title="Size" value="large" />
            </Row>
          </Container>
        </div>
      </Col>
      <Col xs={3} md={2}>
        <div className="price">
          <p>${item.price}</p>
        </div>
        <div>
          <PrimaryButton
            onClick={() => handleRemove(item)}
            bold="true"
            bgcolor="secondary"
            text="Remove"
          />
        </div>
      </Col>
    </Row>
  );
};

export default StoreCartItem;
