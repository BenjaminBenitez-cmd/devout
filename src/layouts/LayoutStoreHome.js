import React from "react";
import { Container } from "reactstrap";
import StoreFooter from "../components/footers/StoreFooter";
import StoreHeader from "../components/headers/StoreHeader";

const LayoutStoreHome = (props) => {
  return (
    <Container>
      {/**Store header */}
      <StoreHeader />
      {props.children}
      <StoreFooter />
    </Container>
  );
};

export default LayoutStoreHome;
