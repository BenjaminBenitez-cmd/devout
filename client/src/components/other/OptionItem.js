import React from "react";
import { Col } from "reactstrap";

const OptionItem = ({ title, value }) => {
  return (
    <Col sm={3}>
      <div className="mt-2">
        <h6 className="text-extrasmall text-bold">{title}</h6>
        <p>{value}</p>
      </div>
    </Col>
  );
};

export default OptionItem;
