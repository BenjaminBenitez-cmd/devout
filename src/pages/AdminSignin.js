import React from "react";
import { useHistory } from "react-router-dom";
import { Col, FormGroup, Row } from "reactstrap";
import PrimaryButton from "../components/buttons/PrimaryButton";
import AdminFooter from "../components/footers/AdminFooter";
import { Input } from "../components/inputs/Input";

const AdminSignin = () => {
  //history for redirect
  const history = useHistory();

  const redirect = () => {
    history.push("/admin");
  };

  const handleSubmit = () => {
    redirect();
  };

  return (
    <div className="container">
      <Row>
        <Col
          sm={12}
          className="vh-100 w-100 d-flex justify-content-center align-items-center"
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
                <PrimaryButton
                  text="submit"
                  type="submit"
                  onClick={handleSubmit}
                />
              </FormGroup>
            </form>
          </div>
        </Col>
      </Row>
      <AdminFooter />
    </div>
  );
};

export default AdminSignin;
