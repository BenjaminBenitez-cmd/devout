import React from "react";
import { useParams } from "react-router-dom";
import { Col, Row } from "reactstrap";
import { useQuery } from "react-query";

import LayoutAdmin from "layouts/LayoutAdmin";
import LayoutAdminPage from "layouts/LayoutAdminPage";
import { calculateTax } from "helpers/calculators";

import OrderRequests from "api/order.requests";
import settings from "data/settings.json";

const AdminEditOrders = () => {
  const { orderid } = useParams();
  const { isLoading, data } = useQuery(
    ["orders", orderid],
    () => OrderRequests.getOne(orderid),
    { enabled: orderid ? true : false }
  );
  return (
    <LayoutAdmin>
      <LayoutAdminPage title="Orders Details">
        {isLoading && <div>Loading...</div>}
        {data?.order && (
          <Row>
            <Col sm={8}>
              <div className="d-flex py-2 justify-content-between text-extrasmall border-bottom">
                <span className="text-bold">Order #</span>{" "}
                <span>{data.order.id}</span>
              </div>
              <div className="my-5 py-2 border-bottom">
                <div className="d-flex  justify-content-between text-bold text-extrasmall">
                  <span>Item</span>
                  <span>Quantity</span>
                  <span>Total</span>
                </div>
                <div className="my-2">
                  {data.order.items.map((item) => (
                    <div className="d-flex justify-content-between">
                      <span className="text-uppercase">{item.name}</span>
                      <span>{item.quantity}</span>
                      <span>${item.total}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="div py-2 border-bottom">
                <div className="d-flex mb-1 justify-content-between">
                  <span className="text-bold">Sub Total</span>{" "}
                  <span>
                    $
                    {data.order.paymentinfo.amount -
                      calculateTax(data.order.paymentinfo.amount, settings.tax)}
                  </span>
                </div>
                <div className="d-flex mb-1 justify-content-between">
                  <span className="text-bold">Tax</span>{" "}
                  <span>
                    ${calculateTax(data.order.paymentinfo.amount, settings.tax)}
                  </span>
                </div>
                <div className="d-flex mb-1 justify-content-between">
                  <span className="text-bold">Total</span>{" "}
                  <span>${data.order.paymentinfo.amount}</span>
                </div>
              </div>
            </Col>
            <Col sm={4}>
              <section>
                <h3 className="text-small text-bold">Customer Details</h3>
                <div className="d-flex mb-1 justify-content-between">
                  <span className="text-bold">Email</span>{" "}
                  <span>{data.order.customer.email}</span>
                </div>
              </section>
              <section className="my-5">
                <h3 className="text-small text-bold">Payment Details</h3>
                <div className="d-flex mb-1 justify-content-between">
                  <span className="text-bold">Status</span>{" "}
                  <span>{data.order.paymentinfo.status}</span>
                </div>
              </section>
            </Col>
          </Row>
        )}
      </LayoutAdminPage>
    </LayoutAdmin>
  );
};

export default AdminEditOrders;
