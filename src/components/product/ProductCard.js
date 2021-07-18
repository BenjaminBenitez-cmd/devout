import React from "react";
import { NavLink } from "react-router-dom";
import styles from "../../assets/css/product.module.css";

const ProductCard = (props) => {
  return (
    <NavLink to={`/product/${props.id}`}>
      <div className="mb-5">
        <div className={styles.imagecontainer}>
          <img
            src={props.images[0].imageurl}
            alt={props.images[0].alt}
            className="img-fluid"
          />
        </div>
        <div className="">
          <div className="mt-3">
            <h5 className="text-small text-bold">{props.name}</h5>
          </div>
          <div className="mt-3">
            <p className="text-small">BZD ${props.price}</p>
          </div>
        </div>
      </div>
    </NavLink>
  );
};

export default ProductCard;
