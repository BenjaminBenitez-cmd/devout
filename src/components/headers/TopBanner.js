import React from "react";
import settings from "../../data/settings.json";
import styles from "../../assets/css/banner.module.css";

const TopBanner = () => {
  return (
    <section className={styles.banner}>
      <p className="text-extrasmall">{settings.banner}</p>
    </section>
  );
};

export default TopBanner;
