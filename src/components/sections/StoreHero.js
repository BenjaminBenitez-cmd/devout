import React from "react";
import homedata from "../../data/home.json";
import herostyles from "../../assets/css/hero.module.css";

const StoreHero = () => {
  return (
    <div
      className={herostyles.container}
      style={{ backgroundImage: `url(${homedata.hero.image.url})` }}
    >
      <h1 className={herostyles.h1}>{homedata.hero.title}</h1>
    </div>
  );
};

export default StoreHero;
