import React from "react";
import LayoutStoreHome from "../layouts/LayoutStoreHome";
import StoreHero from "../components/sections/StoreHero";
import StoreFeatures from "../components/sections/StoreFeatures";
import StoreLatest from "../components/sections/StoreLatest";
import StoreAbout from "../components/sections/StoreAbout";

const StoreHome = () => {
  return (
    <LayoutStoreHome>
      {/**Hero */}
      <StoreHero />
      {/**Features section */}
      <StoreFeatures />
      {/**Latest section */}
      <StoreLatest />
      {/**About section */}
      <StoreAbout />
    </LayoutStoreHome>
  );
};

export default StoreHome;
