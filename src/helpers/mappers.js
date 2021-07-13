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
export const mapProductsToCart = (cartdata, productsdata) => {
  return cartdata.products.map((item) => {
    const cartsproduct = productsdata.find(
      (product) => product.id === item.productid
    );
    return {
      ...cartsproduct,
      ...item,
    };
  });
};
