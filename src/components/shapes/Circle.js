import React from "react";
import circlestyles from "../../assets/css/circle.module.css";

const Circle = (props) => {
  return (
    <div
      className={`${circlestyles.circle} ${props.className && props.className}`}
      style={{
        width: props.width,
        height: props.height,
        backgroundColor: props.color,
        ...props.style,
      }}
    >
      {props.children}
    </div>
  );
};

export default Circle;
