import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { Col, FormGroup, Row } from "reactstrap";
import PrimaryButton from "../components/buttons/PrimaryButton";
import { Input } from "../components/inputs/Input";
import LayoutStoreHome from "../layouts/LayoutStoreHome";
import AuthRequests from "../api/auth.requests";
import { useFormik } from "formik";
import useAuth from "../hooks/useAuth";

const StoreSignin = () => {
  //use hook to signin
  const { signIn } = useAuth();

  const history = useHistory();
  //state for message
  const [message, setMessage] = useState("");

  //use formik hook to create our signin form
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      setMessage("");
      if (!values.email) {
        return setMessage("No email provided");
      }
      if (values.password.length < 8) {
        return setMessage("Password is too short");
      }
      try {
        const response = await AuthRequests.signin(values);
        signIn(response.user);
        history.push("/shop");
      } catch (err) {
        console.error(err);
        setMessage("Something went wrong");
      }
    },
  });

  return (
    <LayoutStoreHome>
      <Row>
        <Col
          sm={12}
          className="my-5 d-flex justify-content-center align-items-center"
        >
          <div style={{ width: "500px" }}>
            <form onSubmit={formik.handleSubmit}>
              <h1 className="text-medium">Signin</h1>
              <FormGroup className="mt-3">
                <label htmlFor="username" className="text-extrasmall">
                  Email
                </label>
                <Input
                  id="email"
                  type="text"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
              </FormGroup>
              <FormGroup className="mt-2">
                <label htmlFor="password" className="text-extrasmall">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />
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
            </form>
          </div>
        </Col>
      </Row>
    </LayoutStoreHome>
  );
};

export default StoreSignin;
