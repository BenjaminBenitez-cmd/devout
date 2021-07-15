/**
 * @param {Component} Component accepts a component
 * @returns {array} table definition for the products table
 */

export const productDefinition = (Component) => [
  {
    Header: "Name",
    accessor: "name", // accessor is the "key" in the data
  },
  {
    Header: "Orders",
    accessor: "orders",
  },
  {
    Header: "Sales",
    accessor: "sales", // accessor is the "key" in the data
  },
  {
    Header: "edit",
    accessor: "id",
    Cell: ({ cell: { value } }) => <Component id={value} />,
  },
];

/**
 * @param {Component} Component accepts a component
 * @returns {array} table definition for orders table
 */

export const orderDefinition = (Component) => [
  {
    Header: "Date",
    accessor: "date", // accessor is the "key" in the data
  },
  {
    Header: "Status",
    accessor: "Fullfilled",
  },
  {
    Header: "Shipping",
    accessor: "shipping", // accessor is the "key" in the data
  },
  {
    Header: "Amount",
    accessor: "amount", // accessor is the "key" in the data
  },
  {
    Header: "edit",
    accessor: "id",
    Cell: ({ cell: { value } }) => <Component id={value} />,
  },
];
