import React from "react";
import { useQuery } from "react-query";
import { FormGroup } from "reactstrap";

import { CustomRadio } from "components/inputs/Input";
import CategoryRequests from "api/category.requests";
import StoreSidebarOption from "./StoreSidebarOption";

const StoreFilter = ({ toggleFilter }) => {
  const { isLoading, data } = useQuery("categories", CategoryRequests.getMany);
  return (
    <div>
      <ul className="list-unstyled">
        <li>
          {isLoading && <div>Loading...</div>}
          <StoreSidebarOption name="Categories">
            {data &&
              data.categories.map((cat, index) => (
                <FormGroup key={index}>
                  <CustomRadio
                    value={cat.name}
                    label={cat.name}
                    onChange={toggleFilter}
                  />
                </FormGroup>
              ))}
          </StoreSidebarOption>
        </li>
      </ul>
    </div>
  );
};

export default StoreFilter;
