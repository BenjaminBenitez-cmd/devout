import React from "react";
import { Col, Container, Row } from "reactstrap";
import LayoutStoreHome from "../layouts/LayoutStoreHome";
import { NavLink } from "react-router-dom";
import useCart from "../hooks/useCart";
import StoreCartItem from "../components/sections/StoreCartItem";
import StoreTotalSummary from "../components/sections/StoreTotalSummary";

const StoreCart = () => {
  const { cartItems, removeAnItem } = useCart();
  console.log(cartItems);
  return (
    <LayoutStoreHome>
      {cartItems.length === 0 && (
        <div className="section text-center text-extrasmall text-uppercase">
          <p>
            NO ITEMS IN CART ADD{" "}
            <NavLink className="text-bold" to="/shop">
              Some
            </NavLink>
          </p>
        </div>
      )}
      {cartItems.length > 0 && (
        <Row className="section">
          <Col sm={12} md={8}>
            <Container fluid className="px-0">
              {cartItems &&
                cartItems.map((item, index) => (
                  <StoreCartItem
                    key={index}
                    item={item}
                    handleRemove={removeAnItem}
                  />
                ))}
            </Container>
          </Col>
          <Col sm={12} md={4} className="mt-5 mt-lg-0">
            <StoreTotalSummary cartItems={cartItems} />
          </Col>
        </Row>
      )}
    </LayoutStoreHome>
  );
};

export default StoreCart;
