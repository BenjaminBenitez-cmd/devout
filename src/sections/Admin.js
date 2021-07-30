import React from "react";
import { Switch, Route } from "react-router-dom";
import AdminProtected from "../components/other/AdminProtected";
import NotificationProvider from "../context/NotificationContext";
import AdminAddCategory from "../pages/AdminAddCategory";
import AdminAddProducts from "../pages/AdminAddProducts";
import AdminCategories from "../pages/AdminCategory";
//pages
import AdminDashboard from "../pages/AdminDashboard";
import AdminEditOrders from "../pages/AdminEditOrders";
import AdminEditProducts from "../pages/AdminEditProducts";
import AdminOrders from "../pages/AdminOrders";
import AdminProducts from "../pages/AdminProducts";
import AdminSignin from "../pages/AdminSignin";
import AdminSignup from "../pages/AdminSignup";

const Admin = () => {
  return (
    <div>
      <NotificationProvider>
        <Switch>
          <Route path="/admin/signin" component={AdminSignin} />
          <Route path="/admin/signup" component={AdminSignup} />
          <AdminProtected
            path="/admin/orders/:orderid/edit"
            component={AdminEditOrders}
          />
          <AdminProtected path="/admin/orders" component={AdminOrders} />
          <AdminProtected
            exact
            path="/admin/categories"
            component={AdminCategories}
          />
          <AdminProtected
            path="/admin/categories/add"
            component={AdminAddCategory}
          />
          <AdminProtected
            path="/admin/products/:productid/edit/"
            component={AdminEditProducts}
          />
          <AdminProtected
            path="/admin/products/add/"
            component={AdminAddProducts}
          />
          <AdminProtected
            exact
            path="/admin/products"
            component={AdminProducts}
          />

          <AdminProtected path="/admin/" component={AdminDashboard} />
        </Switch>
      </NotificationProvider>
    </div>
  );
};

export default Admin;
