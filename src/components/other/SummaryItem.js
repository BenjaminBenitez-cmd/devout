import React from "react";

const SummaryItem = ({ title, value }) => {
  return (
    <div className="d-flex justify-content-between my-4">
      <span className="text-uppercase text-bold">{title}</span>
      <span>${value}</span>
    </div>
  );
};

export default SummaryItem;
