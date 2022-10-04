import React from "react";
//css
import dropdownstyles from "../../assets/css/dropdown.module.css";
import PropTypes from "prop-types";

const Dropdown = ({ isOpen, unstyled, onClick, style, children }) => {
  return (
    <>
      {isOpen && (
        <div
          className={!unstyled ? dropdownstyles.dropdown : ""}
          onClick={onClick}
          style={style}
        >
          <ul className="list-unstyled">{children}</ul>
        </div>
      )}
    </>
  );
};

Dropdown.protoTypes = {
  isOpen: PropTypes.bool,
};

export default Dropdown;
