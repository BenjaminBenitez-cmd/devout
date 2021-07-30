/**
 * @returns {array} table definition for the products table
 */

import { Link } from "react-router-dom";
import CategoryRequests from "../api/category.requests";
import ProductRequests from "../api/product.requests";
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
      <ActionButton id={value}>
        <li>
          <Link to={`/admin/products/${value}/edit/`}>Edit</Link>
        </li>
        <li onClick={() => ProductRequests.removeOne(value)}>Delete</li>
      </ActionButton>
    ),
  },
];

/**
 * @returns {array} table definition for orders table
 */

export const orderDefinition = () => [
  {
    Header: "Order #",
    accessor: "paymentid", // accessor is the "key" in the data
  },
  {
    Header: "Status",
    accessor: "paymentstatus",
  },
  {
    Header: "Amount",
    accessor: "orderdetailtotal", // accessor is the "key" in the data
  },
  {
    Header: "edit",
    accessor: "orderdetailsid",
    Cell: ({ cell: { value } }) => (
      <ActionButton>
        <li>
          <Link to={`/admin/orders/${value}/edit`}>Edit</Link>
        </li>
        <li>Delete</li>
      </ActionButton>
    ),
  },
];

/**
 * @returns {array} table definition for orders table
 */

export const categoriesDefinition = () => [
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "edit",
    accessor: "id",
    Cell: ({ cell: { value } }) => (
      <ActionButton>
        <li>
          <Link to={`/admin/orders/${value}/edit`}></Link>Edit
        </li>
        <li onClick={() => CategoryRequests.removeOne(value)}>Delete</li>
      </ActionButton>
    ),
  },
];
