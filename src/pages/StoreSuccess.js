import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import useCart from "../hooks/useCart";

const StoreSuccess = () => {
  const { clearCartItems } = useCart();
  useEffect(() => {
    return () => {
      clearCartItems();
    };
  }, [clearCartItems]);
  return (
    <div className="section">
      <h1 className="text-medium">Thank you for your purchase!</h1>
      <p>
        A receipt has been sent to your email{" "}
        <NavLink className="text-lowercase text-bold" to="/products">
          Continue Shopping
        </NavLink>
      </p>
    </div>
  );
};

export default StoreSuccess;
