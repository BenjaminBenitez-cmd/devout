import React from "react";
import {
  calculateSubTotal,
  calculateTax,
  calculateTotal,
} from "../../helpers/calculators";
import PrimaryButtonLink from "../buttons/PrimaryButtonLink";
import SummaryItem from "../other/SummaryItem";
import settingsdata from "../../data/settings.json";

export const StoreTotalSummary = ({ cartItems }) => {
  return (
    <div>
      <h2 className="text-small">Apply promo code</h2>
      <div>
        <SummaryItem title="Subtotal" value={calculateSubTotal(cartItems)} />
        <SummaryItem title="Shipping And Handling" value="20.00" />
        <SummaryItem
          title="Taxes"
          value={calculateTax(calculateSubTotal(cartItems), settingsdata.tax)}
        />
        <SummaryItem
          title="Total"
          value={calculateTotal(cartItems, settingsdata.tax)}
        />
        <div className="my-3">
          <PrimaryButtonLink
            width="100%"
            to="/checkout"
            text="Proceed to checkout"
          />
        </div>
      </div>
    </div>
  );
};

export default StoreTotalSummary;
