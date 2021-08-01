import React from "react";
import FeatherIcons from "feather-icons-react";
import Dropdown from "../buttons/Dropdown";
import useDropdown from "../../hooks/useDropdown";
//css
import styles from "../../assets/css/filter.module.css";

const StoreSidebarOption = ({ name, children }) => {
  const { isOpen, toggleOpen } = useDropdown();

  return (
    <div className="my-3">
      <span className={styles.item} onClick={toggleOpen}>
        {name}
        {isOpen ? (
          <FeatherIcons icon="chevron-up" />
        ) : (
          <FeatherIcons icon="chevron-down" />
        )}
      </span>
      <div className="mt-3">
        <Dropdown isOpen={isOpen} unstyled>
          {children}
        </Dropdown>
      </div>
    </div>
  );
};

export default StoreSidebarOption;
