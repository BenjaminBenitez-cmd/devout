import React from "react";
import { NavLink } from "react-router-dom";
import { Col, FormGroup, Row } from "reactstrap";
import PrimaryButton from "../components/buttons/PrimaryButton";
import { CustomRadio, Input } from "../components/inputs/Input";
import LayoutStoreHome from "../layouts/LayoutStoreHome";

const StoreSignup = () => {
  return (
    <LayoutStoreHome>
      <Row>
        <Col
          sm={12}
          className="my-5 d-flex justify-content-center align-items-center"
        >
          <div style={{ width: "500px" }}>
            <form>
              <h1 className="text-medium">Signup</h1>
              <FormGroup>
                <label htmlFor="username" className="text-extrasmall">
                  Username
                </label>
                <Input id="username" type="text" />
              </FormGroup>
              <FormGroup className="mt-2">
                <label htmlFor="password" className="text-extrasmall">
                  Password
                </label>
                <Input id="password" type="password" />
              </FormGroup>
              <FormGroup className="mt-3">
                <CustomRadio label="Sign up for news updates" />
              </FormGroup>
              <FormGroup className="mt-5">
                <PrimaryButton text="submit" type="submit" />
              </FormGroup>
              <FormGroup className="mt-3">
                <p className="text-extrasmall">
                  By Signing up you agree to our privacy policy
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
            </form>
          </div>
        </Col>
      </Row>
    </LayoutStoreHome>
  );
};

export default StoreSignup;
