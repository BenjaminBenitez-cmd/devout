import React from "react";
import { useQuery } from "react-query";

import Table from "components/tables/Table";
import { orderDefinition } from "helpers/columnDefinitions";
import LayoutAdmin from "layouts/Admin";
import LayoutAdminPage from "layouts/AdminPage";

import OrderRequests from "api/order.requests";

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
