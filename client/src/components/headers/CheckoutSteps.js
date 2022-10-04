import React from "react";

const CheckoutSteps = ({ step1, step2 }) => {
  return (
    <div className="mx-auto mb-5" style={{ maxWidth: "300px" }}>
      <div className="d-flex justify-content-between">
        {
          <span className={`text-uppercase text-small ${step1 && "text-bold"}`}>
            Shipping
          </span>
        }
        {
          <span className={`text-uppercase text-small ${step2 && "text-bold"}`}>
            Credit Card
          </span>
        }
      </div>
    </div>
  );
};

export default CheckoutSteps;
