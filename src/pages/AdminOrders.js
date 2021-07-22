import React from "react";
import { useQuery } from "react-query";
import OrderRequests from "../api/order.requests";
import Table from "../components/tables/Table";

//fake data
import { orderDefinition } from "../helpers/columndefinitions";
import LayoutAdmin from "../layouts/LayoutAdmin";
import LayoutAdminPage from "../layouts/LayoutAdminPage";

const AdminOrders = () => {
  const { isLoading, error, data } = useQuery("orders", OrderRequests.getMany);

  return (
    <LayoutAdmin>
      <LayoutAdminPage title="Orders">
        {isLoading && <div>Loading ...</div>}
        {error && <div>Error</div>}
        {data && <Table data={data.orders} definition={orderDefinition()} />}
      </LayoutAdminPage>
    </LayoutAdmin>
  );
};

export default AdminOrders;
