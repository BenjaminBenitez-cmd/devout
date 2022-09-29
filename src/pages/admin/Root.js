import React from "react";
import { Switch, Route } from "react-router-dom";

import AdminHome from "pages/admin/Home";
import AdminCategoriesAdd from "pages/admin/categories/Add";
import AdminCategoriesList from "pages/admin/categories/List";
import AdminOrdersList from "pages/admin/orders/List";
import AdminOrdersEdit from "pages/admin/orders/Edit";
import AdminProductsAdd from "pages/admin/products/Add";
import AdminProductsEdit from "pages/admin/products/Edit";
import AdminProductsList from "pages/admin/products/List";
import AdminAuthSignin from "pages/admin/auth/Signin";
import AdminAuthSignup from "pages/admin/auth/Signup";

import AdminProtected from "components/other/AdminProtected";
import NotificationProvider from "context/NotificationContext";

const Admin = () => {
  return (
    <div>
      <NotificationProvider>
        <Switch>
          <Route path="/admin/signin" component={AdminAuthSignin} />
          <Route path="/admin/signup" component={AdminAuthSignup} />
          <AdminProtected
            path="/admin/orders/:orderid"
            component={AdminOrdersEdit}
          />
          <AdminProtected path="/admin/orders" component={AdminOrdersList} />
          <AdminProtected
            exact
            path="/admin/categories"
            component={AdminCategoriesList}
          />
          <AdminProtected
            path="/admin/categories/add"
            component={AdminCategoriesAdd}
          />
          <AdminProtected
            path="/admin/products/:productid/edit/"
            component={AdminProductsEdit}
          />
          <AdminProtected
            path="/admin/products/add/"
            component={AdminProductsAdd}
          />
          <AdminProtected
            exact
            path="/admin/products"
            component={AdminProductsList}
          />

          <AdminProtected path="/admin/" component={AdminHome} />
        </Switch>
      </NotificationProvider>
    </div>
  );
};

export default Admin;
