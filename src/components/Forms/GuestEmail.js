import React, { useState } from "react";
import { FormGroup } from "reactstrap";
import PrimaryButton from "../buttons/PrimaryButton";
import { Form, Formik } from "formik";
import { MyTextField } from "../inputs/CustomInputs";
import * as Yup from "yup";
import { CustomRadio } from "../inputs/Input";

const GuestEmail = () => {
  //state for message
  const [message, setMessage] = useState("");

  //validation schema
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid Email").required("Required Field"),
  });

  const inititalValues = {
    email: "",
  };

  const onSubmit = async (values) => {
    setMessage("");
    alert(JSON.stringify(values));
  };

  return (
    <Formik
      initialValues={inititalValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <div style={{ width: "500px" }}>
        <Form>
          <h1 className="text-medium">Guest</h1>
          <FormGroup className="mt-3">
            <MyTextField label="Email" id="email" type="text" name="email" />
          </FormGroup>
          <FormGroup className="mt-2">
            <CustomRadio label="Sign me up for the latest updates" />
          </FormGroup>
          <p className="mt-3">{message}</p>
          <FormGroup className="mt-3">
            <PrimaryButton text="submit" type="submit" />
          </FormGroup>
        </Form>
      </div>
    </Formik>
  );
};

export default GuestEmail;
