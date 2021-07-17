import React, { useEffect, useState } from "react";
import inputstyles from "../../assets/css/input.module.css";
//css
import FeatherIcons from "feather-icons-react";
import { mapCategories } from "../../helpers/mappers";

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

export default function CustomSelect({ values, categories }) {
  //drop down state
  const [isOpen, setIsOpen] = useState(false);

  //toggle open dropdown
  const toggleOpen = (e) => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={inputstyles.dropdowncontainer}>
      <div onClick={toggleOpen} className={inputstyles.dropdownheader}>
        Select <FeatherIcons icon="chevron-down" />
      </div>
      {isOpen && (
        <div className={inputstyles.dropdownlistcontainer}>
          <ul className={inputstyles.dropdownlist}>
            {categories &&
              mapCategories(categories, values).map((item) => (
                <li
                  values={item.id}
                  className={inputstyles.listitem}
                  key={item.name}
                >
                  {item.name} {item.isChecked && <FeatherIcons icon="check" />}
                </li>
              ))}
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
