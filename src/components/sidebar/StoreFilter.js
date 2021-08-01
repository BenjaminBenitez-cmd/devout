import React from "react";
import StoreSidebarOption from "./StoreSidebarOption";
import { FormGroup } from "reactstrap";
import { CustomRadio } from "../inputs/Input";
import { useQuery } from "react-query";
import CategoryRequests from "../../api/category.requests";

const StoreFilter = ({ toggleFilter }) => {
  const { isLoading, data } = useQuery("categories", CategoryRequests.getMany);
  return (
    <div>
      <ul className="list-unstyled">
        <li>
          {isLoading && <div>Loading...</div>}
          <StoreSidebarOption name="Categories">
            {data &&
              data.categories.map((cat) => (
                <FormGroup>
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
