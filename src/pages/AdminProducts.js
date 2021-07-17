import React from "react";
import { useQuery } from "react-query";
import ProductRequests from "../api/product.requests";
import ActionButton from "../components/buttons/ActionButton";
import Table from "../components/tables/Table";
//fake data
import { productDefinition } from "../helpers/columndefinitions";
import LayoutAdmin from "../layouts/LayoutAdmin";
import LayoutAdminPage from "../layouts/LayoutAdminPage";

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
          <Table
            data={data.products}
            definition={productDefinition(ActionButton)}
          />
        )}
        {error && <div>{error}</div>}
      </LayoutAdminPage>
    </LayoutAdmin>
  );
};

export default AdminProducts;
