import { Formik, Form } from "formik";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Col, FormGroup, Row } from "reactstrap";
import * as Yup from "yup";

import CheckoutSteps from "components/headers/CheckoutSteps";
import { MySelect, MyTextField } from "components/inputs/Custom";
import Button from "components/buttons/Button";
import CheckoutSummary from "components/blocks/CheckoutSummary";
import LayoutStoreHome from "layouts/StoreHome";

import AddressRequests from "api/address.requests";
import settings from "data/settings.json";
import useAuth from "hooks/useAuth";
import useCart from "hooks/useCart";

const StoreShipping = () => {
  const history = useHistory();

  const { authenticated } = useAuth();
  const { items, addAddress } = useCart();

  const [userAddress, setUserAddress] = useState(false);
  //our formik initial state
  const [value, setValues] = useState({
    city: "",
    state: "",
    phone: "",
    country: "",
    address1: "",
    address2: "",
  });

  const initialValues = {
    city: value.city,
    state: value.state,
    phone: value.phone,
    country: value.country,
    address1: value.address1,
    address2: value.address2,
  };

  //our form validation
  const validationSchema = Yup.object().shape({
    city: Yup.string().required("Required field"),
    state: Yup.string().required("Requied field"),
    phone: Yup.string().required("Required field"),
    country: Yup.string().required("Required field"),
    address1: Yup.string().required("Required field"),
  });
  //fetch our address
  useEffect(() => {
    if (!authenticated) {
      return;
    }
    //get address if authenticated
    const fetchAddress = async () => {
      try {
        const response = await AddressRequests.getOne();
        if (!response.address) {
          setUserAddress(false);
        } else {
          setValues({ ...response.address });
          setUserAddress(true);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchAddress();
  }, [authenticated]);

  //handle the submission logic
  const onSubmit = async (values) => {
    addAddress(values);
    if (!userAddress && authenticated) {
      try {
        await AddressRequests.addOne(values);
      } catch (error) {
        console.error(error);
      }
    }
    history.push("/checkout/payment");
  };

  return (
    <LayoutStoreHome>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(props) => (
          <Form>
            <Row>
              <Col sm={12}>
                <CheckoutSteps step1 />
              </Col>
              <Col sm={12} md={4}>
                <FormGroup className="my-3">
                  <MyTextField
                    label="City"
                    type="text"
                    name="city"
                    placeholder="City"
                  />
                </FormGroup>
                <FormGroup className="my-3">
                  <MyTextField
                    label="State"
                    type="text"
                    name="state"
                    placeholder="State"
                  />
                </FormGroup>
                <FormGroup className="my-3">
                  <MyTextField
                    label="Phone"
                    type="text"
                    name="phone"
                    placeholder="Phone"
                  />
                </FormGroup>
                <FormGroup className="my-3">
                  <MySelect
                    name="country"
                    label="Country"
                    options={settings.countries}
                  />
                </FormGroup>
                <FormGroup className="my-3">
                  <MyTextField
                    label="Address 1"
                    type="text"
                    name="address1"
                    placeholder="Address 1"
                  />
                </FormGroup>
                <FormGroup className="my-3">
                  <MyTextField
                    label="Address 2"
                    type="text"
                    name="address2"
                    placeholder="Address 2"
                  />
                </FormGroup>
              </Col>
              <Col sm={12} md={{ offset: 5, size: 3 }}>
                <CheckoutSummary items={items} />
                <Button
                  type="submit"
                  style={{
                    width: "100%",
                    backgroundColor: !props.isValid
                      ? "gray"
                      : "var(--main-color)",
                    pointerEvents: !props.isValid ? "none" : "auto",
                  }}
                  text="Continue"
                />
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </LayoutStoreHome>
  );
};

export default StoreShipping;
