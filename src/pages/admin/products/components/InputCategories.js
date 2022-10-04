import { useEffect, useState } from "react";
import FeatherIcons from "feather-icons-react";

import ProductRequests from "api/product.requests";
import CategoryRequests from "api/category.requests";
import { mapCategories } from "helpers/mappers";

import inputstyles from "assets/css/input.module.css";

export default function InputCategories({ values, productid }) {
  //drop down state
  const [isOpen, setIsOpen] = useState(false);
  //our local value state
  const [localValues, setLocalValues] = useState(values || []);
  //state for categories
  const [categories, setCategories] = useState(null);
  //state for joining categories with product categories
  const [localCategories, setLocalCategories] = useState(categories || []);

  //fetch the available categories
  const fetchCategories = async () => {
    const response = await CategoryRequests.getMany();
    setCategories(response.categories);
  };

  //toggle open dropdown
  const toggleOpen = (e) => {
    setIsOpen(!isOpen);
  };

  const toggleCategory = async (productid, categoryid) => {
    // await ProductRequests.addCategoryToProduct(productid, categoryid);
    const isAdded = localValues.find(
      (value) => value.categoryid === categoryid
    );

    //if the category exists do not add and remove instead
    if (isAdded) {
      await ProductRequests.removeCategoryFromProduct(productid, categoryid);
      setLocalValues((prev) =>
        prev.filter((value) => value.categoryid !== categoryid)
      );
      return;
    }

    //if category does not already exit add instead
    await ProductRequests.addCategoryToProduct(productid, categoryid);
    setLocalValues((prev) => {
      return [
        ...prev,
        {
          categoryid: categoryid,
        },
      ];
    });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  /**
   * useEffect removes logic from jsx and will allow code reusability
   */
  useEffect(() => {
    if (!categories) return;
    //check if values exist
    if (localValues.length === 0) {
      return setLocalCategories(categories);
    }
    //create merged values if they dont exist
    setLocalCategories(mapCategories(categories, localValues));
  }, [localValues, categories, values]);

  return (
    <div className={inputstyles.dropdowncontainer}>
      <div onClick={toggleOpen} className={inputstyles.dropdownheader}>
        Select <FeatherIcons icon="chevron-down" />
      </div>
      {isOpen && (
        <div className={inputstyles.dropdownlistcontainer}>
          <ul className={inputstyles.dropdownlist}>
            {localCategories &&
              localCategories.map((item) => (
                <li
                  values={item.id}
                  className={inputstyles.listitem}
                  key={item.name}
                  onClick={() => toggleCategory(productid, item.id)}
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
