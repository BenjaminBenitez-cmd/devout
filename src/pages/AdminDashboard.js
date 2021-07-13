import React from "react";
import Circle from "../components/shapes/Circle";
import Heading from "../components/typography/Heading";
import LayoutAdmin from "../layouts/LayoutAdmin";

const AdminDashboard = () => {
  return (
    <LayoutAdmin>
      <div className="col-sm-8">
        <div className="container">
          <div className="row">
            <Heading text="Dashboard" />
          </div>
          <div className="row mt-5">
            <div className="col-sm-12">
              <div className="d-flex justify-content-around flex-wrap">
                <Circle color="black" width="200px" height="200px">
                  <div className="d-flex flex-column text-center">
                    <h2 className="text-small text-light">Sales</h2>
                    <p className="text-small text-light">$20</p>
                  </div>
                </Circle>
                <Circle color="black" width="200px" height="200px">
                  <div className="d-flex flex-column text-center">
                    <h2 className="text-small text-light">Orders</h2>
                    <p className="text-small text-light">$20</p>
                  </div>
                </Circle>
                <Circle color="black" width="200px" height="200px">
                  <div className="d-flex flex-column text-center">
                    <h2 className="text-small text-light">
                      Average order value
                    </h2>
                    <p className="text-small text-light">$20</p>
                  </div>
                </Circle>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-sm-12">
                <div className="d-flex justify-content-around">
                  <Circle color="black" width="200px" height="200px">
                    <div className="d-flex flex-column text-center">
                      <h2 className="text-small text-light">Customers</h2>
                      <p className="text-small text-light"> New $20</p>
                    </div>
                  </Circle>
                  <Circle color="black" width="200px" height="200px">
                    <div className="d-flex flex-column text-center">
                      <h2 className="text-small text-light">
                        Shipping Collected
                      </h2>
                      <p className="text-small text-light">$20</p>
                    </div>
                  </Circle>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutAdmin>
  );
};

export default AdminDashboard;
