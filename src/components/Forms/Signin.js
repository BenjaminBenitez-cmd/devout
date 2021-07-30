import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { FormGroup } from "reactstrap";
import PrimaryButton from "../buttons/PrimaryButton";
import AuthRequests from "../../api/auth.requests";
import { Form, Formik } from "formik";
import useAuth from "../../hooks/useAuth";
import { MyTextField } from "../inputs/CustomInputs";
import * as Yup from "yup";

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
            <PrimaryButton text="submit" type="submit" />
          </FormGroup>
          <div className="mt-3">
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
