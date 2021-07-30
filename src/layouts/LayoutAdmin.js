import React from "react";
//pages
import AdminSidebar from "../components/sidebar/AdminSidebar";
import AdminHeader from "../components/headers/AdminHeader";
import AdminFooter from "../components/footers/AdminFooter";
import Notifications from "../components/other/Notification";

const LayoutAdmin = (props) => {
  return (
    <div className="container-fluid">
      <div className="container">
        <div className="row">
          {/**header */}
          <AdminHeader />

          {/*sidebar */}
          <AdminSidebar />

          {/**main body switch */}
          {props.children}
          {/**Footer */}
          <AdminFooter />
          <Notifications />
        </div>
      </div>
    </div>
  );
};

export default LayoutAdmin;
