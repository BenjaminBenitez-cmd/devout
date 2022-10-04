import React from "react";
import { NavLink } from "react-router-dom";
import buttonstyles from "../../assets/css/primarybutton.module.css";

const Link = (props) => {
  return (
    <NavLink
      to={props.to}
      className={buttonstyles.primary}
      style={{ width: props.width }}
      {...props}
    >
      {props.text}
    </NavLink>
  );
};

export default Link;
