import React from "react";
import "../styles/ExRateHeaderItem.css";

interface ExRateHeaderItemProps {
  curUnit: string;
  dealBasR: string;
}

const ExRateHeaderItem: React.FC<ExRateHeaderItemProps> = ({
  curUnit,
  dealBasR,
}) => {
  return (
    <div className="rate-items">
      <div className="rate-item-name">{curUnit ? curUnit : "..."}</div>
      <div className="rate-item">{dealBasR ? dealBasR : "..."}</div>
    </div>
  );
};

export default ExRateHeaderItem;
