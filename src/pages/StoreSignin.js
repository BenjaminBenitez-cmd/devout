import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Col, FormGroup, Row } from "reactstrap";
import PrimaryButton from "../components/buttons/PrimaryButton";
import { Input } from "../components/inputs/Input";
import LayoutStoreHome from "../layouts/LayoutStoreHome";

const StoreSignin = () => {
  return (
    <LayoutStoreHome>
      <Row>
        <Col
          sm={12}
          className="my-5 d-flex justify-content-center align-items-center"
        >
          <div>
            <form>
              <h1 className="text-medium">Signin</h1>
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
                <PrimaryButton text="submit" type="submit" />
              </FormGroup>
              <div className="mt-3">
                <p className="text-extrasmall">
                  Dont have an account?{" "}
                  <NavLink className="text-extrasmall" to="/signup">
                    Signin
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
