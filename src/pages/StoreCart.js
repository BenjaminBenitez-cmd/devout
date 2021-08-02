import React from "react";
import { Col, Container, Row } from "reactstrap";
import LayoutStoreHome from "../layouts/LayoutStoreHome";
import { NavLink } from "react-router-dom";
import StoreCartItem from "../components/sections/StoreCartItem";
import StoreTotalSummary from "../components/sections/StoreTotalSummary";
import useCart from "../hooks/useCart";

const StoreCart = () => {
  const { state } = useCart();
  const { removeItem } = useCart();
  // const [cartItems, setCartItems] = useState([]);
  // const { authenticated } = useAuth();

  // const removeItem = async (skuid) => {
  //   if (!authenticated) {
  //     const localCart = getCartFromLocalStorage();
  //     if (!localCart) return;
  //     saveCartToLocalStorage(localCart.filter((item) => item.skuid !== skuid));
  //   } else {
  //     try {
  //       const cart = await CartRequests.getOne();
  //       await CartRequests.removeOneFromCart(cart.cart.id, skuid);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   }
  //   setCartItems((prev) => prev.filter((item) => item.skuid !== skuid));
  //   dispatch({ type: REMOVE_ITEM, payment: skuid });
  // };

  // useEffect(() => {
  //   if (!authenticated) {
  //     const items = getCartFromLocalStorage();
  //     if (!items) return;
  //     setCartItems(items);
  //     dispatch({ type: FETCH_ITEMS, payload: items });
  //   } else {
  //     CartRequests.getOne().then((response) => {
  //       setCartItems(response.cart.items);
  //       dispatch({ type: FETCH_ITEMS, payload: response.cart.items });
  //     });
  //   }
  // }, [authenticated]);

  return (
    <LayoutStoreHome>
      {state && state.length === 0 && (
        <div className="section text-center text-extrasmall text-uppercase">
          <p>
            NO ITEMS IN CART ADD{" "}
            <NavLink className="text-bold" to="/shop">
              Some
            </NavLink>
          </p>
        </div>
      )}
      {state && state.length > 0 && (
        <Row className="section">
          <Col sm={12} md={8}>
            <Container fluid className="px-0">
              {state &&
                state.map((item, index) => (
                  <StoreCartItem
                    key={index}
                    item={item}
                    handleRemove={() => removeItem(item.skuid)}
                  />
                ))}
            </Container>
          </Col>
          <Col sm={12} md={4} className="mt-5 mt-lg-0">
            <StoreTotalSummary cartItems={state} />
          </Col>
        </Row>
      )}
    </LayoutStoreHome>
  );
};

export default StoreCart;
