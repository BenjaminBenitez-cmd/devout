import React from "react";
import { Col, Container, Row } from "reactstrap";
import { NavLink } from "react-router-dom";

import CartItem from "components/blocks/CartItem";
import CartSummary from "components/blocks/CartSummary";
import LayoutStoreHome from "layouts/LayoutStoreHome";
import useCart from "hooks/useCart";

const StoreCart = () => {
  const { items } = useCart();
  const { removeItem } = useCart();

  return (
    <LayoutStoreHome>
      {items && items.length === 0 && (
        <div className="section text-center text-extrasmall text-uppercase">
          <p>
            NO ITEMS IN CART ADD{" "}
            <NavLink className="text-bold" to="/shop">
              Some
            </NavLink>
          </p>
        </div>
      )}
      {items && items.length > 0 && (
        <Row className="section">
          <Col sm={12} md={8}>
            <Container fluid className="px-0">
              {items &&
                items.map((item, index) => (
                  <CartItem
                    key={index}
                    item={item}
                    handleRemove={() => removeItem(item.skuid)}
                  />
                ))}
            </Container>
          </Col>
          <Col sm={12} md={4} className="mt-5 mt-lg-0">
            <CartSummary cartItems={items} />
          </Col>
        </Row>
      )}
    </LayoutStoreHome>
  );
};

export default StoreCart;
