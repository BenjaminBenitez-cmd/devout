import React from "react";
import { useQuery } from "react-query";
import CategoryRequests from "../api/category.requests";
import Table from "../components/tables/Table";
//fake data
import {
  categoriesDefinition,
  productDefinition,
} from "../helpers/columndefinitions";
import LayoutAdmin from "../layouts/LayoutAdmin";
import LayoutAdminPage from "../layouts/LayoutAdminPage";

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
