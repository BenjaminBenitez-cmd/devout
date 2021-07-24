import React from "react";
import buttonstyles from "../../assets/css/primarybutton.module.css";

const PrimaryButton = (props) => {
  return (
    <button
      className={
        props.bgcolor ? buttonstyles[props.bgcolor] : buttonstyles.primary
      }
      style={{ width: props.width, fontWeight: props.bold && 700 }}
      {...props}
    >
      {props.text || props.children}
    </button>
  );
};

export default PrimaryButton;
