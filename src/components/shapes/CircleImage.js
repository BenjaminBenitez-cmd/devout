import React from "react";

import Circle from "./Circle";

const CircleImage = (props) => {
  return (
    <Circle height="50px" width="50px">
      <img className="img-fluid" src={props.image} alt={props.alt} />;
    </Circle>
  );
};

export default CircleImage;
