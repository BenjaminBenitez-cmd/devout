import React from "react";
import { useQuery } from "react-query";

import Table from "components/tables/Table";
import { categoriesDefinition } from "helpers/columnDefinitions";
import LayoutAdmin from "layouts/Admin";
import LayoutAdminPage from "layouts/AdminPage";
import CategoryRequests from "api/category.requests";

const AdminCategories = () => {
  const { isLoading, data, error } = useQuery(
    "categories",
    CategoryRequests.getMany
  );

  return (
    <LayoutAdmin>
      <LayoutAdminPage title="Categories">
        {isLoading && <div>Loading products</div>}
        {data && (
          <Table data={data.categories} definition={categoriesDefinition()} />
        )}
        {error && <div>{error}</div>}
      </LayoutAdminPage>
    </LayoutAdmin>
  );
};

export default AdminCategories;
