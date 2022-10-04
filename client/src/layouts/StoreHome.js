import React from "react";
import { Container } from "reactstrap";
import StoreFooter from "components/footers/Store";
import StoreHeader from "components/headers/Store";
import TopBanner from "components/headers/TopBanner";

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
