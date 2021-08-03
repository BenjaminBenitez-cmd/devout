import React from "react";
import { useQuery } from "react-query";
import { NavLink, Redirect, Route, Switch } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import OrderRequests from "../api/order.requests";
import useAuth from "../hooks/useAuth";
import LayoutStoreHome from "../layouts/LayoutStoreHome";

const StoreOrders = () => {
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

const StoreAccount = () => {
  const { authenticated, logOut } = useAuth();
  return (
    <LayoutStoreHome>
      {!authenticated && <Redirect to="/" />}
      <Row>
        <Col md={4}>
          <ul className="list-unstyled">
            <li className="my-2">
              <NavLink className="text-small" to="/account/orders">
                Orders
              </NavLink>
            </li>
            <li className="text-upper">
              <span to="/" onClick={logOut}>
                Log Out
              </span>
            </li>
          </ul>
        </Col>
        <Col md={4}>
          <Switch>
            <Route path="/account/orders" component={StoreOrders} />
          </Switch>
        </Col>
      </Row>
    </LayoutStoreHome>
  );
};

export default StoreAccount;
