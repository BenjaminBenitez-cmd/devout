import React from "react";
import { FormGroup } from "reactstrap";
import FeatherIcons from "feather-icons-react";
import Dropdown from "../buttons/Dropdown";
import { CustomRadio } from "../inputs/Input";
import useDropdown from "../../hooks/useDropdown";
//css
import styles from "../../assets/css/filter.module.css";

const StoreSidebarOption = ({ value }) => {
  const { isOpen, toggleOpen } = useDropdown();

  return (
    <div className="my-3">
      <span className={styles.item} onClick={toggleOpen}>
        {value}
        {isOpen ? (
          <FeatherIcons icon="chevron-up" />
        ) : (
          <FeatherIcons icon="chevron-down" />
        )}
      </span>
      <div className="mt-3">
        <Dropdown isOpen={isOpen} unstyled>
          <FormGroup tag="fieldset">
            <FormGroup>
              <CustomRadio label="Blue" />
            </FormGroup>
            <FormGroup>
              <CustomRadio label="Blue" />
            </FormGroup>
            <FormGroup>
              <CustomRadio label="Blue" />
            </FormGroup>
          </FormGroup>
        </Dropdown>
      </div>
    </div>
  );
};

export default StoreSidebarOption;
