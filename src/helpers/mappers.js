//accepts an array and component
export function generateObject(data, Component) {
  const keys = Object.keys(data[0]);
  let newKeys = keys
    .filter((node) => node !== "id")
    .map((node) => {
      return {
        Header: node,
        accessor: node,
      };
    });

  const actionButton = {
    Header: "edit",
    accessor: "id",
    Cell: ({ cell: { value } }) => <Component id={value} />,
  };

  newKeys = [...newKeys, actionButton];

  return newKeys;
}

/**maps
 * @param {array} cartdata receives cart data
 * @param {array} receives product array
 * @returns {array} cart items with respective product values
 */
export const mapProductsToCart = (items, productsdata) => {
  if (items.length <= 0) return [];
  return items.map((item) => {
    const cartsproduct = productsdata.find(
      (product) => product.id.toString() === item.productid.toString()
    );
    return {
      ...cartsproduct,
      ...item,
      quantity: 1,
    };
  });
};

/**
 *
 * @param {array} categories an array of all categories
 * @param {array} values an array of only the products categories
 * @returns {array} Returns array including an isChecked parameters
 */

export const mapCategories = (categories, values) => {
  return categories.map((item) => {
    const isFound = values.find((value) => value.categoryid === item.id);
    return {
      ...item,
      isChecked: isFound ? true : false,
    };
  });
};
