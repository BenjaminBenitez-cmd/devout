import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import LayoutStoreHome from "../layouts/LayoutStoreHome";
//data
import cartdata from "../data/cart.json";
import productsdata from "../data/productdetails.json";
import PrimaryButtonLink from "../components/buttons/PrimaryButtonLink";
import PrimaryButton from "../components/buttons/PrimaryButton";
//mappers
import { mapProductsToCart } from "../helpers/mappers";
import SummaryItem from "../components/other/SummaryItem";
import OptionItem from "../components/other/OptionItem";

const StoreCart = () => {
  const [cartItems, setCartItems] = useState(null);

  useEffect(() => {
    setCartItems(mapProductsToCart(cartdata, productsdata));
  }, []);

  return (
    <LayoutStoreHome>
      <Row className="section">
        <Col sm={12} md={8}>
          <Container fluid className="px-0">
            {cartItems &&
              cartItems.map((item) => (
                <Row className="mb-3" key={item.id}>
                  <Col xs={4} md={3}>
                    <img
                      className="img-fluid"
                      src={item.images[0].url}
                      alt={item.images[0].alt}
                    />
                  </Col>
                  <Col xs={5} md={7}>
                    <div>
                      <h5 className="text-small text-bold">{item.name}</h5>
                    </div>
                    <div>
                      <Container fluid className="p-0">
                        <Row>
                          <OptionItem title="Color" value="red" />
                          <OptionItem title="Size" value="large" />
                        </Row>
                      </Container>
                    </div>
                  </Col>
                  <Col xs={3} md={2}>
                    <div className="price">
                      <p>${item.price}</p>
                    </div>
                    <div>
                      <PrimaryButton
                        bold="true"
                        bgcolor="secondary"
                        text="Remove"
                      />
                    </div>
                  </Col>
                </Row>
              ))}
          </Container>
        </Col>
        <Col sm={12} md={4} className="mt-5 mt-lg-0">
          <h2 className="text-small">Apply promo code</h2>
          <div>
            <SummaryItem title="Subtotal" value="400.00" />
            <SummaryItem title="Shipping And Handling" value="20.00" />
            <SummaryItem title="Taxes" value="10.00" />
            <SummaryItem title="Total" value="500.00" />
            <div className="my-3">
              <PrimaryButtonLink
                width="100%"
                to="/checkout"
                text="Proceed to checkout"
              />
            </div>
          </div>
        </Col>
      </Row>
    </LayoutStoreHome>
  );
};

export default StoreCart;
