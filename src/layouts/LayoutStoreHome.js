import React from "react";
import { Container } from "reactstrap";
import StoreFooter from "../components/footers/StoreFooter";
import StoreHeader from "../components/headers/StoreHeader";
import TopBanner from "../components/headers/TopBanner";

const LayoutStoreHome = (props) => {
  return (
    <>
      <TopBanner />
      <Container>
        {/**Store header */}
        <StoreHeader />
        {props.children}
        <StoreFooter />
      </Container>
    </>
  );
};

export default LayoutStoreHome;
