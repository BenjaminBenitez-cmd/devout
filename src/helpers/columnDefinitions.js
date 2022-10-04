import CategoryActionButton from "components/buttons/actionbuttons/CategoryActionButton";
import OrderActionButton from "components/buttons/actionbuttons/OrderActionButton";
import ProductActionButton from "components/buttons/actionbuttons/ProductActionButton";
/**
 * @returns {array} table definition for the products table
 */
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
    Cell: ({ cell: { value } }) => <ProductActionButton id={value} />,
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
    Cell: ({ cell: { value } }) => <OrderActionButton id={value} />,
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
    Cell: ({ cell: { value } }) => <CategoryActionButton id={value} />,
  },
];
