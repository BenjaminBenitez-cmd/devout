import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Col, Container, Form, FormGroup, Row } from "reactstrap";

import PrimaryButton from "components/buttons/PrimaryButton";
import { Input, TextArea } from "components/inputs/Input";
import InputCategories from "components/inputs/InputCategories";
import InputImage from "components/inputs/InputImage";
import LayoutAdmin from "layouts/LayoutAdmin";
import LayoutAdminPage from "layouts/LayoutAdminPage";
import useNotifications from "hooks/useNotifications";
import ProductRequests from "api/product.requests";

const AdminEditProducts = () => {
  const { productid } = useParams();
  const { addNotification } = useNotifications();
  //initial value state
  const [initialValues, setInitialValues] = useState(null);
  //new images
  const [newImages, setNewImages] = useState([]);
  //new categories

  //fetch products
  const fetchProduct = async (id) => {
    const response = await ProductRequests.getOne(id);
    setInitialValues({
      ...response.product,
    });
  };

  //handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!initialValues) return;
    //add new images to request body
    const values = {
      ...initialValues,
      images: newImages,
    };

    try {
      //update products
      await ProductRequests.updateOne(values);
      addNotification("Successfully Updated Product");
    } catch (err) {
      addNotification("Unable to Update Product");
    }
  };

  //handle any change to the inputs
  const handleChange = (e) => {
    setInitialValues((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  //update the images
  const updateImages = (image) => {
    setNewImages((prev) => {
      return [...prev, image];
    });
  };

  useEffect(() => {
    //check if product id is available
    if (productid == null) return;

    fetchProduct(productid);
  }, [productid]);

  return (
    <LayoutAdmin>
      <LayoutAdminPage title="Edit">
        {initialValues && (
          <Form onSubmit={handleSubmit}>
            <Container fluid>
              <Row>
                <Col sm={6}>
                  <Container fluid className="px-0">
                    <Row>
                      {/**Product details */}
                      <h3 className="text-small ps-0">Product details</h3>
                      <Col sm={12} className="my-3 p-0">
                        <Input
                          type="text"
                          placeholder={initialValues.name}
                          value={initialValues.name}
                          name="name"
                          onChange={handleChange}
                        />
                      </Col>
                      <Col className="my-3 pr-0 ps-0" sm={6}>
                        <Input
                          type="text"
                          placeholder={initialValues.skucode}
                          value={initialValues.skucode}
                          name="skucode"
                          onChange={handleChange}
                        />
                      </Col>
                      <Col sm={6} className="my-3 p-0">
                        <Input
                          type="number"
                          placeholder={initialValues.quantity}
                          value={initialValues.quantity}
                          name="quantity"
                          onChange={handleChange}
                        />
                      </Col>
                      <Col sm={12} className="my-3 p-0">
                        <TextArea
                          placeholder={initialValues.longdescription}
                          value={initialValues.longdescription}
                          name="longdescription"
                          onChange={handleChange}
                        />
                      </Col>
                      <Col sm={12} className="my-3 p-0">
                        <Input
                          type="text"
                          placeholder={initialValues.shortdescription}
                          value={initialValues.shortdescription}
                          name="shortdescription"
                          onChange={handleChange}
                        />
                      </Col>
                    </Row>
                    <Row className="mt-5">
                      {/**Product Price*/}
                      <h3 className="text-small ps-0">Price</h3>
                      <Col sm={12} className="my-3 px-0">
                        <Input
                          type="number"
                          step=".01"
                          placeholder={initialValues.price}
                          value={initialValues.price}
                          name="price"
                          onChange={handleChange}
                        />
                      </Col>
                    </Row>
                    <Row className="mt-5">
                      {/**Image Gallery */}
                      <h3 className="text-small ps-0">Image Gallery</h3>
                      <Col sm={12} className="my-3 px-0">
                        <InputImage
                          images={initialValues.images}
                          updateImages={updateImages}
                        />
                      </Col>
                    </Row>
                  </Container>
                </Col>
                <Col sm={{ size: 4, offset: 2 }}>
                  {/**Save and categories */}
                  <PrimaryButton
                    onSubmit={handleSubmit}
                    type="submit"
                    text="Save product"
                    width="100%"
                  />
                  <FormGroup className="mt-5">
                    <h3 className="text-small">Categories</h3>
                    <InputCategories
                      values={initialValues.categories}
                      productid={productid}
                    />
                  </FormGroup>
                </Col>
              </Row>
            </Container>
          </Form>
        )}
      </LayoutAdminPage>
    </LayoutAdmin>
  );
};

export default AdminEditProducts;
