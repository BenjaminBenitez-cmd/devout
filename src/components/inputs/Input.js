import React, { useState } from "react";
import inputstyles from "../../assets/css/input.module.css";
//css
import FeatherIcons from "feather-icons-react";

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
      className={inputstyles.input}
      placeholder={props.placeholder}
      value={props.value}
      row="10"
    />
  );
};

export default function CustomSelect() {
  const [isOpen, setIsOpen] = useState(false);
  const [setValue] = useState(null);

  const toggle = (e) => {
    setValue(e.target.value);
    setIsOpen(false);
  };

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className={inputstyles.dropdowncontainer}>
      <div onClick={toggleOpen} className={inputstyles.dropdownheader}>
        Select <FeatherIcons icon="chevron-down" />
      </div>
      {isOpen && (
        <div className={inputstyles.dropdownlistcontainer}>
          <ul className={inputstyles.dropdownlist}>
            <li onClick={toggle} className={inputstyles.listitem}>
              Mangoes
            </li>
            <li onClick={toggle} className={inputstyles.listitem}>
              Apples
            </li>
            <li onClick={toggle} className={inputstyles.listitem}>
              Oranges
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

const CustomRadio = ({ label }) => {
  return (
    <label class={inputstyles.b_contain}>
      <input type="checkbox" />
      <span>{label}</span>
      <div class={inputstyles.b_input}></div>
    </label>
  );
};

export { TextArea, Input, CustomSelect, CustomRadio };
