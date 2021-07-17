import React from "react";
//css
import dropdownstyles from "../../assets/css/dropdown.module.css";
import PropTypes from "prop-types";

const Dropdown = (props) => {
  return (
    <>
      {props.isOpen && (
        <div
          className={!props.unstyled && dropdownstyles.dropdown}
          onClick={props.onClick}
          ref={props.ref}
        >
          <ul className="list-unstyled">{props.children}</ul>
        </div>
      )}
    </>
  );
};

Dropdown.protoTypes = {
  isOpen: PropTypes.bool,
};

export default Dropdown;
