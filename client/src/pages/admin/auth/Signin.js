import { Form, Formik } from "formik";
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Col, FormGroup, Row } from "reactstrap";
import * as Yup from "yup";

import Button from "components/buttons/Button";
import AdminFooter from "components/footers/Admin";
import { MyTextField } from "components/inputs/Custom";
import useAuth from "hooks/useAuth";
import AuthRequests from "api/auth.requests";

const Signin = () => {
  //history for redirect
  const [message, setMessage] = useState();
  const { adminAuthenticated, signInAdmin } = useAuth();

  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Required"),
    password: Yup.string()
      .min(8, "Password must be atleast 8 characters")
      .required("Required"),
  });

  const onSubmit = async (values) => {
    try {
      const response = await AuthRequests.signinAdmin(values);
      signInAdmin(response);
    } catch (err) {
      setMessage(err.response.data.message || "Something went wrong");
    }
  };

  return (
    <Formik
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      initialValues={initialValues}
    >
      <div className="container">
        {adminAuthenticated && <Redirect to="/admin/dashboard" />}
        <Row>
          <Col
            sm={12}
            className="vh-100 w-100 d-flex justify-content-center align-items-center"
          >
            <div>
              <Form>
                <h1 className="text-medium">Signin</h1>
                <FormGroup>
                  <MyTextField
                    label="Username"
                    type="text"
                    placeholder="Username"
                    name="username"
                  />
                </FormGroup>
                <FormGroup className="mt-2">
                  <MyTextField
                    label="Password"
                    type="password"
                    name="password"
                  />
                </FormGroup>
                <p className="mt-3">{message}</p>

                <FormGroup className="mt-3">
                  <Button text="submit" type="submit" />
                </FormGroup>
              </Form>
            </div>
          </Col>
        </Row>
        <AdminFooter />
      </div>
    </Formik>
  );
};

export default Signin;
