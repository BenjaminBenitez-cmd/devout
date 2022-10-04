import React from "react";
import { Col, Row } from "reactstrap";

import Circle from "components/shapes/Circle";
import LayoutAdmin from "layouts/Admin";
import LayoutAdminPage from "layouts/AdminPage";

const AdminDashboard = () => {
  return (
    <LayoutAdmin>
      <LayoutAdminPage title="Dashboard">
        <Row className="mt-5">
          <Col sm={6} md={4} lg={4} className="mb-3">
            <Circle color="black" width="200px" height="200px">
              <div className="d-flex flex-column text-center">
                <h2 className="text-small text-light">Orders</h2>
                <p className="text-small text-light">$20</p>
              </div>
            </Circle>
          </Col>
          <Col sm={6} md={4} lg={4} className="mb-3">
            <Circle color="black" width="200px" height="200px">
              <div className="d-flex flex-column text-center">
                <h2 className="text-small text-light">Shipping Collected</h2>
                <p className="text-small text-light">$20</p>
              </div>
            </Circle>
          </Col>
          <Col sm={6} md={4} lg={4} className="mb-3">
            <Circle color="black" width="200px" height="200px">
              <div className="d-flex flex-column text-center">
                <h2 className="text-small text-light">Average order value</h2>
                <p className="text-small text-light">$20</p>
              </div>
            </Circle>
          </Col>
          <Col sm={6} md={4} lg={{ size: 4, offset: 2 }} className="mb-3">
            <Circle color="black" width="200px" height="200px">
              <div className="d-flex flex-column text-center">
                <h2 className="text-small text-light">Customers</h2>
                <p className="text-small text-light"> New $20</p>
              </div>
            </Circle>
          </Col>
          <Col sm={6} md={4} lg={4} className="mb-3">
            <Circle color="black" width="200px" height="200px">
              <div className="d-flex flex-column text-center">
                <h2 className="text-small text-light">Shipping Collected</h2>
                <p className="text-small text-light">$20</p>
              </div>
            </Circle>
          </Col>
        </Row>
      </LayoutAdminPage>
    </LayoutAdmin>
  );
};

export default AdminDashboard;
