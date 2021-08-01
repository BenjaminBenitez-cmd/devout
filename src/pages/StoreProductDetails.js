import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import LayoutStoreHome from "../layouts/LayoutStoreHome";
//data
import ProductCorousel from "../components/product/ProductCorousel";
import ProductRequests from "../api/product.requests";
import PrimaryButton from "../components/buttons/PrimaryButton";
import {
  getCartFromLocalStorage,
  saveCartToLocalStorage,
} from "../helpers/localstorage";
import CartRequests from "../api/cart.requests";
import useAuth from "../hooks/useAuth";

const StoreProductDetails = (props) => {
  const { id } = useParams();
  const { authenticated } = useAuth();
  const [product, setProduct] = useState(null);
  //find product by id
  const fetchProduct = useCallback(async () => {
    const response = await ProductRequests.getOne(id);
    setProduct(response.product);
  }, [id]);

  const addItem = async () => {
    if (!product) return;

    if (!authenticated) {
      let newItem = {
        productid: product.id,
        skuid: product.skuid,
        images: product.images,
        name: product.name,
        price: product.price,
        quantity: 1,
      };
      const localCart = getCartFromLocalStorage();
      if (!localCart) return saveCartToLocalStorage([newItem]);
      saveCartToLocalStorage([...localCart, newItem]);
    } else {
      try {
        const cartResponse = await CartRequests.getOne();
        await CartRequests.addOneToCart(cartResponse.cart.id, {
          skuid: product.skuid,
          productid: product.id,
          quantity: 1,
        });
      } catch (err) {
        console.error(err);
      }
    }
  };

  //perform find on refresh
  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return (
    <LayoutStoreHome>
      {product ? (
        <>
          <Row>
            <Col sm={12} md={7}>
              <Container fluid className="px-0">
                <Row>
                  {/**First image */}
                  <Col sm={12} md={12} className="mb-3">
                    <img
                      src={product.images[0].imageurl}
                      alt={product.images[0].alt}
                      className="img-fluid"
                    />
                  </Col>

                  {/**Small Images */}
                  {product.images.map(
                    (image, index) =>
                      index >= 1 && (
                        <Col sm={12} md={6} className="mb-3">
                          <img
                            key={index}
                            src={image.imageurl}
                            alt={image.alt}
                            className="img-fluid"
                          />
                        </Col>
                      )
                  )}
                </Row>
              </Container>
              {/**Map all images */}
            </Col>
            <Col sm={12} md={{ size: 4, offset: 1 }}>
              <div className="my-5">
                <h1 className="text-extra-large text-bold">{product.name}</h1>
              </div>
              <div className="my-5">
                <h3 className="text-medium">${product.price}</h3>
              </div>
              <div className="my-5">
                <PrimaryButton
                  disabled={!product.live}
                  onClick={addItem}
                  width="100%"
                >
                  {!product.live ? "Unavailable" : "Add to Cart"}
                </PrimaryButton>
              </div>
              <div className="my-5">
                <h5 className="text-small text-bold">Editor's Note</h5>
                <p>{product.longdescription}</p>
              </div>
              <div className="my-5">
                <h5 className="text-small text-bold">Color</h5>
                <p>{product.shortdescription}</p>
              </div>
              <div className="my-5">
                <h5 className="text-small text-bold">Shipping</h5>
                <p>{product.cartdescription}</p>
              </div>
            </Col>
          </Row>
          {/**You may also like */}
          <Row className="section">
            <Col sm={12} className="mb-4">
              <h4 className="text-medium text-bold">You may also like</h4>
            </Col>
            <ProductCorousel />
          </Row>
          {/**Recent products */}
          <Row className="section">
            <Col sm={12} className="mb-4">
              <h4 className="text-medium text-bold">Recent Products</h4>
            </Col>
            <ProductCorousel />
          </Row>
        </>
      ) : (
        <div>No product</div>
      )}
    </LayoutStoreHome>
  );
};

export default StoreProductDetails;
