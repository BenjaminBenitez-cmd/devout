import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FormGroup } from "reactstrap";
import * as Yup from "yup";
import { Form, Formik } from "formik";

import Button from "components/buttons/Button";
import { MyTextField } from "components/inputs/Custom";
import AuthRequests from "api/auth.requests";

const Signup = () => {
  //state for message
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  //validation schema
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid Email").required("Required Field"),
    password: Yup.string()
      .min(8, "8 or more characters")
      .required("Required Field"),
  });

  const inititalValues = {
    email: "",
    password: "",
  };

  const onSubmit = async (values, { setSubmitting }) => {
    setMessage("");
    setLoading(true);
    try {
      await AuthRequests.signup(values);
      setLoading(false);
      setMessage("Successfully signed up, verify your email");
    } catch (err) {
      setMessage(err.response.data.message || "Something went wrong");
      setLoading(false);
    }
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={inititalValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <div style={{ width: "500px" }}>
        <Form>
          <h1 className="text-medium">Signup</h1>
          <FormGroup className="mt-3">
            <MyTextField label="Email" id="email" type="text" name="email" />
          </FormGroup>
          <FormGroup className="mt-2">
            <MyTextField
              label="Password"
              id="password"
              type="password"
              name="password"
            />
          </FormGroup>
          <p className="mt-3">{message}</p>
          <FormGroup className="mt-3">
            <Button disable={loading} text="submit" type="submit" />
          </FormGroup>
          <FormGroup className="mt-3">
            <p className="text-extrasmall">
              By registering you agree to our{" "}
              <NavLink
                className="text-extrasmall text-bold"
                to="/privacypolicy"
              >
                Privacy Policy
              </NavLink>
            </p>
          </FormGroup>
          <FormGroup className="mt-3">
            <p className="text-extrasmall">
              Already have an account?{" "}
              <NavLink className="text-extrasmall text-bold" to="/signin">
                Sign in
              </NavLink>
            </p>
          </FormGroup>
        </Form>
      </div>
    </Formik>
  );
};

export default Signup;
