import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Col, Container, FormGroup, Row } from "reactstrap";
import PrimaryButton from "../components/buttons/PrimaryButton";
import Select, { Input, TextArea } from "../components/inputs/Input";
import InputImage from "../components/inputs/InputImage";
import LayoutAdmin from "../layouts/LayoutAdmin";
import LayoutAdminPage from "../layouts/LayoutAdminPage";

const AdminEditProducts = () => {
  const { productid } = useParams();
  //determines action to be performed
  const [isEdit, setIsEdit] = useState(true);

  //check if product id is available
  useEffect(() => {
    if (productid == null) {
      setIsEdit(false);
    }
  }, [productid]);

  return (
    <LayoutAdmin>
      <LayoutAdminPage title={isEdit ? "Edit" : "Add"}>
        <Container fluid>
          <Row>
            <Col sm={6}>
              <Container fluid className="px-0">
                <Row>
                  {/**Product details */}
                  <h3 className="text-small ps-0">Product details</h3>
                  <Col sm={12} className="my-3 p-0">
                    <Input type="text" placeholder="Name" />
                  </Col>
                  <Col className="my-3 pr-0 ps-0" sm={6}>
                    <Input type="text" placeholder="SKU" />
                  </Col>
                  <Col sm={6} className="my-3 p-0">
                    <Input type="text" placeholder="Inventory" />
                  </Col>
                  <Col sm={12} className="my-3 p-0">
                    <TextArea placeholder="Description" />
                  </Col>
                </Row>
                <Row className="mt-5">
                  {/**Product Price*/}
                  <h3 className="text-small ps-0">Price</h3>
                  <Col sm={12} className="my-3 px-0">
                    <Input type="number" step=".01" placeholder="Price" />
                  </Col>
                </Row>
                <Row className="mt-5">
                  {/**Image Gallery */}
                  <h3 className="text-small ps-0">Image Gallery</h3>
                  <Col sm={12} className="my-3 px-0">
                    <InputImage />
                  </Col>
                </Row>
              </Container>
            </Col>
            <Col sm={{ size: 4, offset: 2 }}>
              {/**Save and categories */}
              <PrimaryButton text="Save product" width="100%" />
              <FormGroup className="mt-5">
                <h3 className="text-small">Categories</h3>
                <Select />
              </FormGroup>
            </Col>
          </Row>
        </Container>
      </LayoutAdminPage>
    </LayoutAdmin>
  );
};

export default AdminEditProducts;
