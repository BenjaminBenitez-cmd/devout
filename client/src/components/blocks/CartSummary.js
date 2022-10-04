import React from "react";
import {
  calculateSubTotal,
  calculateTax,
  calculateTotal,
} from "helpers/calculators";

import Link from "components/buttons/Link";
import SummaryItem from "components/other/SummaryItem";
import settingsdata from "data/settings.json";

export const CartSummary = ({ cartItems }) => {
  return (
    <div>
      <h2 className="text-small font-main">Apply promo code</h2>
      <div>
        <SummaryItem title="Subtotal" value={calculateSubTotal(cartItems)} />
        <SummaryItem title="Shipping And Handling" value="0" />
        <SummaryItem
          title="Taxes"
          value={calculateTax(calculateSubTotal(cartItems), settingsdata.tax)}
        />
        <SummaryItem
          title="Total"
          value={calculateTotal(cartItems, settingsdata.tax)}
        />
        <div className="my-3">
          <Link width="100%" to="/checkout" text="Proceed to checkout" />
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
