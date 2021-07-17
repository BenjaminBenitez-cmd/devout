/**
 * @returns {array} table definition for the products table
 */

import ActionButton from "../components/buttons/ActionButton";

export const productDefinition = () => [
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
    Cell: ({ cell: { value } }) => (
      <ActionButton id={value} redirectTo="products" />
    ),
  },
];

/**
 * @returns {array} table definition for orders table
 */

export const orderDefinition = () => [
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
    Cell: ({ cell: { value } }) => <ActionButton id={value} />,
  },
];
