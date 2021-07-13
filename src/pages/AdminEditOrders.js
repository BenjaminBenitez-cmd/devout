import React from "react";
import { Col, Row } from "reactstrap";
import LayoutAdmin from "../layouts/LayoutAdmin";
import LayoutAdminPage from "../layouts/LayoutAdminPage";

const AdminEditOrders = () => {
  return (
    <LayoutAdmin>
      <LayoutAdminPage title="Orders">
        <Row>
          <Col sm={8}></Col>
          <Col sm={4}></Col>
        </Row>
      </LayoutAdminPage>
    </LayoutAdmin>
  );
};

export default AdminEditOrders;
