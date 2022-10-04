import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { FormGroup } from "reactstrap";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import Button from "components/buttons/Button";
import { MyTextField } from "components/inputs/Custom";
import AuthRequests from "api/auth.requests";
import useAuth from "hooks/useAuth";

const Signin = ({ redirect }) => {
  //use hook to signin
  const { signIn } = useAuth();
  const history = useHistory();
  //state for message
  const [message, setMessage] = useState("");

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

  const onSubmit = async (values) => {
    setMessage("");
    try {
      const response = await AuthRequests.signin(values);
      signIn(response.user);
      if (redirect) return history.push(redirect);
    } catch (err) {
      console.error(err);
      setMessage(err.response.data.message || "Something went wrong");
    }
  };

  return (
    <Formik
      initialValues={inititalValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <div style={{ maxWidth: "500px" }}>
        <Form>
          <h1 className="text-medium">Signin</h1>
          <FormGroup className="mt-3">
            <MyTextField label="Email" type="text" name="email" />
          </FormGroup>
          <FormGroup className="mt-2">
            <MyTextField label="Password" type="password" name="password" />
          </FormGroup>
          <p className="mt-3">{message}</p>

          <FormGroup className="mt-3">
            <Button text="submit" type="submit" />
          </FormGroup>
          <div className="mt-4">
            <p className="text-extrasmall">
              Dont have an account?{" "}
              <NavLink className="text-extrasmall text-bold" to="/signup">
                Signup
              </NavLink>
            </p>
          </div>
        </Form>
      </div>
    </Formik>
  );
};

export default Signin;
