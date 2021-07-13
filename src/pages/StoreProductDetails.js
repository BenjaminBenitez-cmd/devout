import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import LayoutStoreHome from "../layouts/LayoutStoreHome";
//data
import data from "../data/productdetails.json";
import PrimaryButtonLink from "../components/buttons/PrimaryButtonLink";
import ProductCorousel from "../components/product/ProductCorousel";

const StoreProductDetails = (props) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  //find product by id
  const getProductDetails = (id) => {
    return data.find((product) => product.id.toString() === id);
  };

  //perform find on refresh
  useEffect(() => {
    setProduct(getProductDetails(id));
  }, [id]);

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
                      src={product.images[0].url}
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
                            src={image.url}
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
                <PrimaryButtonLink
                  to="/cart"
                  text="Proceed to Checkout"
                  width="100%"
                />
              </div>
              <div className="my-5">
                <h5 className="text-small text-bold">Editor's Note</h5>
                <p>{product.longdescription}</p>
              </div>
              <div className="my-5">
                <h5 className="text-small text-bold">Color</h5>
                <p>White / Black</p>
              </div>
              <div className="my-5">
                <h5 className="text-small text-bold">Shipping</h5>
                <p>Free deliveries on orders over $180</p>
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
