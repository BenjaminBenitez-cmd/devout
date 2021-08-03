import React from "react";
import homedata from "../../data/home.json";
import herostyles from "../../assets/css/hero.module.css";
import PrimaryButtonLink from "../buttons/PrimaryButtonLink";
import { Container } from "reactstrap";
import overlaystyle from "../../assets/css/overlay.module.css";

const StoreHero = () => {
  return (
    <div
      className={herostyles.container}
      style={{ backgroundImage: `url(${homedata.hero.image.url})` }}
    >
      <div className={overlaystyle.overlay}>
        <Container>
          <div>
            <h1 className={herostyles.h1}>{homedata.hero.title}</h1>
            <PrimaryButtonLink to={homedata.hero.link} text="View Now" />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default StoreHero;
