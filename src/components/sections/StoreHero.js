import React from "react";
import homedata from "../../data/home.json";
import herostyles from "../../assets/css/hero.module.css";
import PrimaryButtonLink from "../buttons/PrimaryButtonLink";
import { Container } from "reactstrap";

const StoreHero = () => {
  return (
    <div
      className={herostyles.container}
      style={{ backgroundImage: `url(${homedata.hero.image.url})` }}
    >
      <Container>
        <h1 className={herostyles.h1}>{homedata.hero.title}</h1>
        <PrimaryButtonLink to={homedata.hero.link} text="View Now" />
      </Container>
    </div>
  );
};

export default StoreHero;
