import React from "react";
import Table from "../components/tables/Table";

//fake data
import orderdata from "../data/orders.json";
import LayoutAdmin from "../layouts/LayoutAdmin";
import LayoutAdminPage from "../layouts/LayoutAdminPage";

const AdminOrders = () => {
  return (
    <LayoutAdmin>
      <LayoutAdminPage title="Orders">
        <Table data={orderdata} />
      </LayoutAdminPage>
    </LayoutAdmin>
  );
};

export default AdminOrders;
