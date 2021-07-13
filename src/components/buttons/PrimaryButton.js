import React from "react";
import buttonstyles from "../../assets/css/primarybutton.module.css";

const PrimaryButton = (props) => {
  return (
    <button
      {...props}
      className={
        props.bgcolor ? buttonstyles[props.bgcolor] : buttonstyles.primary
      }
      style={{ width: props.width, fontWeight: props.bold && 700 }}
    >
      {props.text}
    </button>
  );
};

export default PrimaryButton;
