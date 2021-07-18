import React from "react";
import { Switch, Route } from "react-router-dom";
import AdminAddCategory from "../pages/AdminAddCategory";
import AdminAddProducts from "../pages/AdminAddProducts";
import AdminCategories from "../pages/AdminCategory";
//pages
import AdminDashboard from "../pages/AdminDashboard";
import AdminEditProducts from "../pages/AdminEditProducts";
import AdminOrders from "../pages/AdminOrders";
import AdminProducts from "../pages/AdminProducts";
import AdminSignin from "../pages/AdminSignin";

const Admin = () => {
  return (
    <div>
      <Switch>
        <Route path="/admin/signin" component={AdminSignin} />
        <Route path="/admin/orders" component={AdminOrders} />
        <Route exact path="/admin/categories" component={AdminCategories} />
        <Route path="/admin/categories/add" component={AdminAddCategory} />
        <Route
          path="/admin/products/:productid/edit/"
          component={AdminEditProducts}
        />
        <Route path="/admin/products/add/" component={AdminAddProducts} />
        <Route exact path="/admin/products" component={AdminProducts} />
        <Route path="/admin/" component={AdminDashboard} />
      </Switch>
    </div>
  );
};

export default Admin;
