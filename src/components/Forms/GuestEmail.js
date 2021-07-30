import React from "react";
import { FormGroup } from "reactstrap";
import PrimaryButton from "../buttons/PrimaryButton";
import { Form, Formik } from "formik";
import { MyTextField } from "../inputs/CustomInputs";
import * as Yup from "yup";
import { CustomRadio } from "../inputs/Input";
import { useHistory } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const GuestEmail = () => {
  const { setEmail } = useAuth();
  const history = useHistory();
  //validation schema
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid Email").required("Required Field"),
  });

  const inititalValues = {
    email: "",
  };

  const onSubmit = async (values) => {
    setEmail(values.email);
    history.push("/checkout/shipping");
  };

  return (
    <Formik
      initialValues={inititalValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <div style={{ maxWidth: "500px" }}>
        <Form>
          <h1 className="text-medium">Guest</h1>
          <FormGroup className="mt-3">
            <MyTextField label="Email" id="email" type="text" name="email" />
          </FormGroup>
          <FormGroup className="mt-2">
            <CustomRadio label="Sign me up for the latest updates" />
          </FormGroup>
          <FormGroup className="mt-3">
            <PrimaryButton text="submit" type="submit" />
          </FormGroup>
        </Form>
      </div>
    </Formik>
  );
};

export default GuestEmail;
