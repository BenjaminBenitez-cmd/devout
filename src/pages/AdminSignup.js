import { Form, Formik } from "formik";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Col, FormGroup, Row } from "reactstrap";
import PrimaryButton from "../components/buttons/PrimaryButton";
import AdminFooter from "../components/footers/AdminFooter";
import { MyTextField } from "../components/inputs/CustomInputs";
import * as Yup from "yup";
import AuthRequests from "../api/auth.requests";

const AdminSignup = () => {
  //history for redirect
  const [message, setMessage] = useState();
  const [success, setSuccess] = useState(true);

  const initialValues = {
    username: "",
    firstname: "",
    lastname: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Required"),
    firstname: Yup.string()
      .max(12, "Please use a shorter name")
      .required("Required"),
    lastname: Yup.string()
      .max(12, "Please use a shorter name")
      .required("Required"),
    password: Yup.string()
      .min(8, "Password must be atleast 8 characters")
      .required("Required"),
  });

  const onSubmit = async (values) => {
    try {
      await AuthRequests.signupAdmin(values);
      setMessage("Successfully created admin");
      setSuccess(true);
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
        <Row>
          <Col
            sm={12}
            className="vh-100 w-100 d-flex justify-content-center align-items-center"
          >
            <div>
              <Form>
                <h1 className="text-medium">Signup</h1>
                <FormGroup>
                  <MyTextField
                    label="Username"
                    type="text"
                    placeholder="Username"
                    name="username"
                  />
                </FormGroup>
                <FormGroup>
                  <MyTextField
                    label="Firstname"
                    type="text"
                    placeholder="Firstname"
                    name="firstname"
                  />
                </FormGroup>
                <FormGroup>
                  <MyTextField
                    label="Lastname"
                    type="text"
                    placeholder="Lastname"
                    name="lastname"
                  />
                </FormGroup>
                <FormGroup className="mt-2">
                  <MyTextField
                    label="Password"
                    type="password"
                    name="password"
                  />
                </FormGroup>
                <p className="mt-3">
                  {message}
                  {success && (
                    <NavLink
                      className="text-extrasmall text-bold"
                      to="/admin/signin"
                    >
                      Signin
                    </NavLink>
                  )}
                </p>

                <FormGroup className="mt-3">
                  <PrimaryButton text="submit" type="submit" />
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

export default AdminSignup;
