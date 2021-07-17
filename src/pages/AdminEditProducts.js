import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Col, Container, Form, FormGroup, Row } from "reactstrap";
import ProductRequests from "../api/product.requests";
import PrimaryButton from "../components/buttons/PrimaryButton";
import Select, { Input, TextArea } from "../components/inputs/Input";
import InputImage from "../components/inputs/InputImage";
import LayoutAdmin from "../layouts/LayoutAdmin";
import LayoutAdminPage from "../layouts/LayoutAdminPage";

const AdminEditProducts = () => {
  const { productid } = useParams();

  //initial value state
  const [initialValues, setInitialValues] = useState(null);
  //category state
  const [allCateg, setAllCateg] = useState(null);
  //new images
  const [newImages, setNewImages] = useState([]);

  //fetch products
  const fetchProduct = async (id) => {
    const response = await fetch("http://localhost:3005/api/v1/products/" + id);
    const data = await response.json();
    setInitialValues({
      ...data.product,
      skuid: data.product.variants[0].skuid,
    });
  };

  //fetch the available options
  const fetchOptions = async () => {
    const response = await fetch("http://localhost:3005/api/v1/categories");
    const data = await response.json();
    setAllCateg(data.categories);
  };

  //handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!initialValues) return;
    console.log("submitted -----");
    console.log(newImages);
    //add new images to request body
    const values = {
      ...initialValues,
      images: newImages,
    };

    try {
      //update products
      await ProductRequests.updateOne(values);
    } catch (err) {
      console.log(err);
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
    fetchOptions();
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
                          placeholder={initialValues.variants[0].skuname}
                          value={initialValues.variants[0].skuname}
                          name="skucode"
                          onChange={handleChange}
                        />
                      </Col>
                      <Col sm={6} className="my-3 p-0">
                        <Input
                          type="text"
                          placeholder={initialValues.variants[0].quantity}
                          value={initialValues.variants[0].quantity}
                          name="amount"
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
                          images={initialValues.variants[0].images}
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
                    <Select
                      values={initialValues.categories}
                      categories={allCateg}
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
