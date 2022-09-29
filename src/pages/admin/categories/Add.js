import React, { useState } from "react";
import { Col, Container, Form, Row } from "reactstrap";

import PrimaryButton from "components/buttons/PrimaryButton";
import { Input } from "components/inputs/Input";
import useNotifications from "hooks/useNotifications";
import LayoutAdmin from "layouts/LayoutAdmin";
import LayoutAdminPage from "layouts/LayoutAdminPage";
import CategoryRequests from "api/category.requests";

const AdminAddCategory = () => {
  //initial value state
  const [name, setName] = useState(null);
  const { addNotification } = useNotifications();

  //handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) return;
    try {
      //add products
      await CategoryRequests.addOne({ name });
      addNotification("Successfully added Category");
    } catch (err) {
      console.error(err);
      addNotification("Unable to add Category");
    }
  };

  //handle any change to the inputs
  const handleChange = (e) => {
    setName(e.target.value);
  };

  return (
    <LayoutAdmin>
      <LayoutAdminPage title="Add">
        <Form onSubmit={handleSubmit}>
          <Container fluid>
            <Row>
              <Col sm={6}>
                <Container fluid className="px-0">
                  <Row>
                    {/**Category details */}
                    <h3 className="text-small ps-0">Category details</h3>
                    <Col sm={12} className="my-3 p-0">
                      <Input
                        type="text"
                        placeholder="Name"
                        value={name}
                        name="name"
                        onChange={handleChange}
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
                  text="Save Category"
                  width="100%"
                />
              </Col>
            </Row>
          </Container>
        </Form>
      </LayoutAdminPage>
    </LayoutAdmin>
  );
};

export default AdminAddCategory;
