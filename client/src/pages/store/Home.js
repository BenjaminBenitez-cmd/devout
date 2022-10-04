import React from "react";

import LayoutStoreHome from "layouts/StoreHome";
import Hero from "components/blocks/Hero";
import Features from "components/blocks/Features";
import Latest from "components/blocks/Latest";
import About from "components/blocks/About";

const Home = () => {
  return (
    <LayoutStoreHome>
      {/**Hero */}
      <Hero />
      {/**Features section */}
      <Features />
      {/**Latest section */}
      <Latest />
      {/**About section */}
      <About />
    </LayoutStoreHome>
  );
};

export default Home;
