import React from "react";
import inputstyles from "assets/css/input.module.css";
//css

const Input = (props) => {
  return (
    <input
      {...props}
      className={inputstyles.input}
      type={props.type}
      placeholder={props.placeholder}
      value={props.value}
    />
  );
};

const TextArea = (props) => {
  return (
    <textarea
      {...props}
      name={props.name}
      className={inputstyles.input}
      placeholder={props.placeholder}
      value={props.value}
      rows="10"
    ></textarea>
  );
};

const CustomRadio = ({ label, ...props }) => {
  return (
    <label className={inputstyles.b_contain}>
      <input type="checkbox" {...props} />
      <span>{label}</span>
      <div className={inputstyles.b_input}></div>
    </label>
  );
};

export { TextArea, Input, CustomRadio };
