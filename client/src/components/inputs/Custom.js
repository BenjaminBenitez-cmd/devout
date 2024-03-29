import React from "react";
import { useField } from "formik";

import useDropdown from "hooks/useDropdown";
import Dropdown from "components/buttons/Dropdown";

import styles from "assets/css/input.module.css";

const MyTextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label className="text-extrasmall">{label}</label>
      <input {...field} {...props} className={styles.input} />
      {meta.touched && meta.error ? (
        <div className="text-extrasmall">{meta.error}</div>
      ) : null}
    </>
  );
};

const MyTextArea = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label className="text-extrasmall">
        {label}
        <textarea {...field} {...props} className={styles.input} />
      </label>
      {meta.touched && meta.error ? (
        <div className="text-extrasmall">{meta.error}</div>
      ) : null}
    </>
  );
};

/**
 *
 * @param {Array} param an array of option values
 */

function MySelect({ options, ...props }) {
  // This isn't an input, so instead of using the values in 'field' directly,
  // we'll use 'meta' and 'helpers'.
  const { isOpen, toggleOpen } = useDropdown();
  /* eslint-disable no-unused-vars */
  const [field, meta, helpers] = useField(props.name);

  const { value } = meta;
  const { setValue } = helpers;
  const isSelected = (v) => (v === value ? "selected" : "");

  const handleListClick = (option) => {
    setValue(option);
    toggleOpen();
  };

  return (
    <>
      <span className="text-extrasmall">{props.label}</span>
      <div className="position-relative">
        <div className={styles.input} onClick={toggleOpen}>
          {value || props.placeholder}
        </div>
        <Dropdown
          isOpen={isOpen}
          style={{ transform: "none", width: "100%", cursor: "pointer" }}
        >
          <ul className="list-unstyled">
            {options.map((option, index) => (
              <li
                key={index}
                onClick={() => handleListClick(option)}
                className={isSelected(5)}
              >
                {option}
              </li>
            ))}
          </ul>
        </Dropdown>
        {meta.touched && meta.error ? (
          <div className="text-extrasmall">{meta.error}</div>
        ) : null}
      </div>
    </>
  );
}

export { MyTextField, MyTextArea, MySelect };
