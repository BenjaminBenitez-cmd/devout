import React from "react";
import StoreSidebarOption from "./StoreSidebarOption";
import categories from "../../data/categories.json";

const StoreFilter = ({ toggleFilter }) => {
  return (
    <div>
      <ul className="list-unstyled">
        {categories.map((item, index) => (
          <li key={index}>
            <StoreSidebarOption value={item} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StoreFilter;
