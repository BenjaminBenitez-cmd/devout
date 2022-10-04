import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";

import ProductCorousel from "components/product/Corousel";
import Button from "components/buttons/Button";
import LayoutStoreHome from "layouts/LayoutStoreHome";

import ProductRequests from "api/product.requests";
import useCart from "hooks/useCart";

const StoreProductDetails = () => {
  const { id } = useParams();
  const { addItem } = useCart();

  const [product, setProduct] = useState(null);

  //perform find on refresh
  useEffect(() => {
    ProductRequests.getOne(id).then((response) => setProduct(response.product));
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <LayoutStoreHome>
      {!product ? (
        <div>No product</div>
      ) : (
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
                <Button
                  // disabled={!product.live}
                  onClick={() => addItem(product)}
                  width="100%"
                >
                  {!product.live ? "Unavailable" : "Add to Cart"}
                </Button>
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
      )}
    </LayoutStoreHome>
  );
};

export default StoreProductDetails;
