import React from "react";
import ActionButton from "../components/buttons/ActionButton";
import Table from "../components/tables/Table";

//fake data
import orderdata from "../data/orders.json";
import { orderDefinition } from "../helpers/columndefinitions";
import LayoutAdmin from "../layouts/LayoutAdmin";
import LayoutAdminPage from "../layouts/LayoutAdminPage";

const AdminOrders = () => {
  return (
    <LayoutAdmin>
      <LayoutAdminPage title="Orders">
        {/* <Table data={orderdata} definition={orderDefinition(ActionButton)} /> */}
      </LayoutAdminPage>
    </LayoutAdmin>
  );
};

export default AdminOrders;
