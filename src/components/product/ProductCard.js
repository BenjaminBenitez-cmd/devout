import React from "react";
import { NavLink } from "react-router-dom";
import { Card } from "reactstrap";
import styles from "../../assets/css/product.module.css";

const ProductCard = (props) => {
  return (
    <Card className={styles.card}>
      <NavLink to={`/product/${props.id}`}>
        <div>
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
      </NavLink>
    </Card>
  );
};

export default ProductCard;
