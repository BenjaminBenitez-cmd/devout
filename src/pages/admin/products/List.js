import React from "react";
import { useQuery } from "react-query";

import Table from "components/tables/Table";
import LayoutAdmin from "layouts/LayoutAdmin";
import LayoutAdminPage from "layouts/LayoutAdminPage";
import { productDefinition } from "helpers/columnDefinitions";
import ProductRequests from "api/product.requests";

const AdminProducts = () => {
  const { isLoading, data, error } = useQuery(
    "products",
    ProductRequests.getMany
  );

  return (
    <LayoutAdmin>
      <LayoutAdminPage title="Products">
        {isLoading && <div>Loading products</div>}
        {data && (
          <Table data={data.products} definition={productDefinition()} />
        )}
        {error && <div>{error}</div>}
      </LayoutAdminPage>
    </LayoutAdmin>
  );
};

export default AdminProducts;
