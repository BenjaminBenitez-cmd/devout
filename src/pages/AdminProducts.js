import React from "react";
import Table from "../components/tables/Table";
//fake data
import productdata from "../data/products.json";
import LayoutAdmin from "../layouts/LayoutAdmin";
import LayoutAdminPage from "../layouts/LayoutAdminPage";

const AdminProducts = () => {
  return (
    <LayoutAdmin>
      <LayoutAdminPage title="Products">
        <Table data={productdata} />
      </LayoutAdminPage>
    </LayoutAdmin>
  );
};

export default AdminProducts;
