import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Col, Container, Form, FormGroup, Row } from "reactstrap";
import ProductRequests from "../api/product.requests";
import PrimaryButton from "../components/buttons/PrimaryButton";
import { Input, TextArea } from "../components/inputs/Input";
import InputCategories from "../components/inputs/InputCategories";
import InputImage from "../components/inputs/InputImage";
import useNotifications from "../hooks/useNotifications";
import LayoutAdmin from "../layouts/LayoutAdmin";
import LayoutAdminPage from "../layouts/LayoutAdminPage";

const AdminAddProducts = () => {
  const history = useHistory();
  const { addNotification } = useNotifications();
  //initial value state
  const [initialValues, setInitialValues] = useState({
    skucode: "",
    name: "",
    price: 0,
    cartdesc: "",
    shortdesc: "",
    longdesc: "",
    images: [],
    amount: 0,
  });

  //new images
  const [newImages, setNewImages] = useState([]);
  //const product id
  const [productid, setProductId] = useState(null);

  //handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!initialValues) return;
    if (!newImages) return;
    //add new images to request body
    const values = {
      ...initialValues,
      images: newImages,
    };

    try {
      //add products
      const response = await ProductRequests.addOne(values);
      setProductId(response.product.id);
      addNotification("Added Product");
      history.push("/admin/products");
    } catch (err) {
      addNotification("Unable to Add Product");
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

  return (
    <LayoutAdmin>
      <LayoutAdminPage title="Add">
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
                          placeholder="Name"
                          value={initialValues.name}
                          name="name"
                          onChange={handleChange}
                        />
                      </Col>
                      <Col className="my-3 pr-0 ps-0" sm={6}>
                        <Input
                          type="text"
                          placeholder="SKU Code"
                          value={initialValues.skucode}
                          name="skucode"
                          onChange={handleChange}
                        />
                      </Col>
                      <Col sm={6} className="my-3 p-0">
                        <Input
                          type="text"
                          placeholder="Amount"
                          value={initialValues.quantity}
                          name="amount"
                          onChange={handleChange}
                        />
                      </Col>
                      <Col sm={12} className="my-3 p-0">
                        <TextArea
                          placeholder="Long Description"
                          value={initialValues.longdesc}
                          name="longdesc"
                          onChange={handleChange}
                        />
                      </Col>
                      <Col sm={12} className="my-3 p-0">
                        <Input
                          type="text"
                          placeholder="Cart Description"
                          value={initialValues.cartdesc}
                          name="cartdesc"
                          onChange={handleChange}
                        />
                      </Col>
                      <Col sm={12} className="my-3 p-0">
                        <Input
                          type="text"
                          placeholder="Short Description"
                          value={initialValues.shortdesc}
                          name="shortdesc"
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
                          placeholder="Price"
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
                        <InputImage updateImages={updateImages} />
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
                    {productid ? (
                      <InputCategories
                        values={initialValues.categories}
                        productid={productid}
                      />
                    ) : (
                      <div className="text-muted">Save Product First</div>
                    )}
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

export default AdminAddProducts;
