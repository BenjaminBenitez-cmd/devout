import React from "react";
import { useQuery } from "react-query";
import { Col, Container, Row } from "reactstrap";

import OrderRequests from "api/order.requests";

const Orders = () => {
  const { isLoading, data } = useQuery("orders", OrderRequests.getManyForUser);
  return (
    <Container fluid className="px-0">
      {isLoading && <div>Loading ...</div>}
      {data?.orders && (
        <Row className="px-0">
          <Col sm={12}>
            <Container fluid className="px-0">
              <Row className="my-4">
                <h1 className="text-small text-bold">Orders</h1>
              </Row>
              <Row>
                <Col xs={4}>
                  <p className="text-extrasmall text-bold text-upper">
                    Order ID
                  </p>
                </Col>
                <Col xs={4}>
                  <p className="text-extrasmall text-bold text-upper">
                    Payment Status
                  </p>
                </Col>
                <Col xs={4}>
                  <p className="text-extrasmall text-bold text-upper">Amount</p>
                </Col>
              </Row>
              {data.orders.map((order) => (
                <Row>
                  <Col xs={4}>
                    <p>{order.id}</p>
                  </Col>
                  <Col xs={4}>
                    <p className="text-upper">{order.status}</p>
                  </Col>
                  <Col xs={4}>
                    <p>{order.total}</p>
                  </Col>
                </Row>
              ))}
            </Container>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Orders;
